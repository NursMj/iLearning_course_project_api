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
        ...fieldNames
      })

      return res.json(item)
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
    let items
    if (!brandId && !topicId) {
      items = await Item.findAndCountAll({ limit, offset })
    }
    if (!brandId && topicId) {
      items = await Item.findAndCountAll({
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
    return res.json(items)
  }

  async getOne(req, res) {
    const { id } = req.params
    const item = await Item.findOne({
      where: { id },
        include: [{ model: ItemeInfo, as: 'info' }],
    })

    const topic = await Topic.findOne({ where: { id: item.TopicId } })

    return res.json({ item, topic })
  }

  async delete(req, res) {
    const { id } = req.params
    await Collection.destroy({
      where: { id },
    })
    res.json({ message: 'Collection deleted successfully' })
  }
}

module.exports = new itemController()
