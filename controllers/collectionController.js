const fs = require('fs')
const Sequelize = require('sequelize')
const ApiError = require('../error/ApiError')
const { Collection, Topic, Item, User } = require('../models')
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')
const { indexCollection } = require('../utils/indexing')
const { deleteUnindexCollection } = require('../utils/deletingFunctions')

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
})

const uplodeImgToAws = async (file) => {
  const fileKey = `${uuidv4()}-${file.originalname}`
  const fileData = fs.readFileSync(file.path)
  const uploadResult = await s3
    .upload({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: fileData,
    })
    .promise()

  return uploadResult.Location
}

const s3 = new AWS.S3()

class CollectionController {
  async create(req, res, next) {
    try {
      const file = req.file
      const { name, desc, topicId, userId, itemFields } = req.body
      const parsedItemFileds = JSON.parse(itemFields)
      let img = ''
      if (file != undefined) {
        img = await uplodeImgToAws(file)
      }

      const collection = await Collection.create({
        name,
        desc,
        UserId: userId,
        TopicId: topicId,
        img,
        ...parsedItemFileds,
      })
      await indexCollection(collection)
      return res.json({ message: 'Collection created successfully' })
    } catch (e) {
      next(ApiError.badRequest(e.message))
      console.log(e.message)
    }
  }

  async update(req, res) {
    const { id } = req.params
    const file = req.file
    const { name, desc, topicId } = req.body
    let img = ''
    try {
      if (file != undefined) {
        img = await uplodeImgToAws(file)
      }
      const [updatedRowsCount] = await Collection.update(
        { name, desc, TopicId: topicId, img },
        {
          where: { id },
        }
      )
      if (updatedRowsCount === 0) {
        return res.status(404).json({ error: 'Collection not found' })
      }
      const collection = await Collection.findOne({ where: { id } })
      await indexCollection(collection)
      return res.json({ message: 'Collection updated successfully' })
    } catch (error) {
      console.error('Error updating Collection:', error)
      return res.status(500).json({ error: 'Internal server error' })
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

    try {
      deleteUnindexCollection(id)
      res.json({ message: 'Collection deleted successfully' })
    } catch (error) {
      console.error(error)
      return res.status(400).json({ error: error.message })
    }
  }
}

module.exports = new CollectionController()
