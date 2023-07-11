// const uuid = require('uuid')
// const path = require('path')
const ApiError = require('../error/ApiError')
const { Collection, Topic, ItemPattern, User } = require('../models')

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
      })

      const itemPattern = await ItemPattern.create({
        CollectionId: collection.id,
        UserId: userId,
        ...itemFields,
      })

      return res.json([collection, itemPattern])
    } catch (e) {
      next(ApiError.badRequest(e.message))
      console.log(e.message)
    }
  }

  async getAll(req, res) {
    let { brandId, topicId, limit, page } = req.query
    page = +page || 1
    limit = +limit || 50
    let offset = page * limit - limit
    let collections
    if (!brandId && !topicId) {
      collections = await Collection.findAndCountAll({ limit, offset })
    }
    if (!brandId && topicId) {
      collections = await Collection.findAndCountAll({
        where: { topicId },
        limit,
        offset,
      })
    }
    // if (brandId && !typeId) {
    //   devices = await Device.findAndCountAll({
    //     where: { brandId },
    //     limit,
    //     offset,
    //   })
    // }
    // if (brandId && typeId) {
    //   devices = await Device.findAndCountAll({
    //     where: { brandId, typeId },
    //     limit,
    //     offset,
    //   })
    // }
    return res.json(collections)
  }

  async getOne(req, res) {
    const { id } = req.params
    const collection = await Collection.findOne({
      where: { id },
      include: [
        { model: Topic, as: 'Topic' },
        { model: User, as: 'User' },
        { model: ItemPattern, as: 'ItemPattern' },
      ],
    })

    return res.json(collection)
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
