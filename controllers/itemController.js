const ApiError = require('../error/ApiError')
const { Item, Collection, User } = require('../models')

const includeCollectionAndUser = {
  model: Collection,
  attributes: ['id', 'name'],
  include: [
    {
      model: User,
      attributes: ['id', 'name'],
    },
  ],
}

class itemController {
  async create(req, res, next) {
    try {
      const { fieldValues, fieldNames, collectionId } = req.body

      const item = await Item.create({
        CollectionId: collectionId,
        ...fieldValues,
        ...fieldNames,
      })

      return res.json(item)
    } catch (e) {
      next(ApiError.badRequest(e.message))
      console.log(e.message)
    }
  }

  async getAll(req, res) {
    let { collectionId } = req.query
    let items
    if (!collectionId) {
      items = await Item.findAll({
        include: [includeCollectionAndUser],
      })
    } else {
      items = await Item.findAll({
        where: { CollectionId: collectionId },
        include: [includeCollectionAndUser],
      })
    }
    return res.json(items)
  }

  async getOne(req, res) {
    const { id } = req.params
    const item = await Item.findOne({
      where: { id },
      include: [includeCollectionAndUser],
    })
    return res.json(item)
  }

  async delete(req, res) {
    const { id } = req.params
    await Item.destroy({
      where: { id },
    })
    res.json({ message: 'Item deleted successfully' })
  }

  async getLatest(req, res) {
    let limit = +req.query.limit || 12
    try {
      const latestRecords = await Item.findAll({
        attributes: ['id', 'requiredField1_value'],
        include: [includeCollectionAndUser],
        order: [['createdAt', 'DESC']],
        limit: limit,
      })
      return res.json(latestRecords)
    } catch (error) {
      console.error(error)
      return res.status(400).json({ error: error.message })
    }
  }
}

module.exports = new itemController()
