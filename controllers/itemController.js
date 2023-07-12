const ApiError = require('../error/ApiError')
const { Item, Topic, ItemPattern } = require('../models')

class itemController {
  async create(req, res, next) {
    try {
      const { fieldValues, fieldNames, collectionId, userId } = req.body

      const item = await Item.create({
        UserId: userId,
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
    let { collectionId, limit, page } = req.query
    page = +page || 1
    limit = +limit || 20
    let offset = page * limit - limit
    let items
    if (!collectionId) {
      items = await Item.findAndCountAll({ limit, offset })
    } else {
      items = await Item.findAndCountAll({
        where: { CollectionId: collectionId },
        limit,
        offset,
      })
    }
    // if (brandId && typeId) {
    //   items = await Device.findAndCountAll({
    //     where: { brandId, typeId },
    //     limit,
    //     offset,
    //   })
    // }
    return res.json(items)
  }

  async getOne(req, res) {
    const { id } = req.params
    const item = await Item.findOne({
      where: { id },
      // include: [
      //   { model: Topic, as: 'Topic' }
      // ],
    })

    // const topic = await Topic.findOne({ where: { id: item.TopicId } })

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
    const { limit } = req.query
    limit = +limit || 12
    try {
      const latestRecords = await Item.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit,
      })
      return res.json('latestRecords')
    } catch (error) {
      next(ApiError.badRequest(e.message))
      console.log(e.message)
    }
  }
}

module.exports = new itemController()
