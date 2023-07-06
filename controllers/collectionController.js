// const uuid = require('uuid')
// const path = require('path')
const ApiError = require('../error/ApiError')
const { Collection } = require('../models')

class collectionController {
  async create(req, res, next) {
    try {
      const { name, desc, topicId, userId } = req.body
      //   const { img } = req.files
      //   let fileName = uuid.v4() + '.jpg'
      //   img.mv(path.resolve(__dirname, '..', 'static', fileName))

      const collection = await Collection.create({
        name,
        desc,
        userId,
        topicId,
        img: '',
      })

      //   if (info) {
      //     info = JSON.parse(info)
      //     info.forEach((i) => {
      //       DeviceInfo.create({
      //         title: i.title,
      //         description: i.description,
      //         deviceId: device.id,
      //       })
      //     })
      //   }

      return res.json(collection)
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
    let collection
    if (!brandId && !topicId) {
      collection = await Collection.findAndCountAll({ limit, offset })
    }
    if (!brandId && topicId) {
      collection = await Collection.findAndCountAll({
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
    return res.json(collection)
  }

  async getOne(req, res) {
    const { id } = req.params
    const collection = await Collection.findOne({
      where: { id },
      //   include: [{ model: DeviceInfo, as: 'info' }],
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
