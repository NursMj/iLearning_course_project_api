// const uuid = require('uuid')
// const path = require('path')
const Sequelize = require('sequelize')
const ApiError = require('../error/ApiError')
const { Collection, Topic, Item, User } = require('../models')

class collectionController {
  async create(req, res, next) {
    try {
      const { name, desc, topicId, userId, itemFields } = req.body
      //   const { img } = req.files
      //   let fileName = uuid.v4() + '.jpg'
      //   img.mv(path.resolve(__dirname, '..', 'static', fileName))

      const collection = await Collection.create({
        name,
        desc,
        UserId: userId,
        TopicId: topicId,
        img: '',
        ...itemFields,
      })

      return res.json(collection)
    } catch (e) {
      next(ApiError.badRequest(e.message))
      console.log(e.message)
    }
  }

  async getAll(req, res) {
    let { topicId } = req.query
    let collections
    if (!topicId) {
      collections = await Collection.findAll()
    }
    if (topicId) {
      collections = await Collection.findAll({
        where: { TopicId: topicId },
      })
    }
    return res.json(collections)
  }

  async getOne(req, res) {
    const { id } = req.params
    const collection = await Collection.findOne({
      where: { id },
      include: [
        { model: Topic, as: 'Topic' },
        { model: User, attributes: ['id', 'name'] },
      ],
    })
    return res.json(collection)
  }

  async getUserCollections(req, res) {
    const { id } = req.params
    const user = await User.findOne({
      where: { id },
      User,
      attributes: ['id', 'name'],
      include: [
        {
          model: Collection,
          include: [
            {
              model: Item,
              attributes: ['id'],
            },
            {
              model: User,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    })

    return res.json(user)
  }

  async getLargest(req, res) {
    let limit = +req.query.limit || 5
    try {
      const collections = await Collection.findAll({
        attributes: ['id', 'name'],
        include: [
          {
            model: Item,
            attributes: ['id'],
          },
          {
            model: User,
            attributes: ['id', 'name'],
          },
        ],
        group: ['Collection.id'],
        order: [
          [
            Sequelize.literal(
              '(SELECT COUNT(*) FROM `Items` WHERE `Items`.`CollectionId` = `Collection`.`id`)'
            ),
            'DESC',
          ],
        ],
        limit: limit,
      })

      res.json(collections)
    } catch (error) {
      console.error('Error retrieving collections:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async delete(req, res) {
    const { id } = req.params
    await Collection.destroy({
      where: { id },
    })
    res.json({ message: 'Collection deleted successfully' })
  }
}

module.exports = new collectionController()
