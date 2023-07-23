const ApiError = require('../error/ApiError')
const { Item, Collection, User, Like, Tag } = require('../models')
const Sequelize = require('sequelize')
const { indexItem } = require('../utils/indexing')
const { deleteUnindexItem } = require('../utils/deletingFunctions')

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

const includeItemLikesCount = {
  include: [
    [
      Sequelize.literal(
        '(SELECT COUNT(*) FROM Likes WHERE Likes.ItemId = Item.id)'
      ),
      'likesCount',
    ],
  ],
}

class ItemController {
  async create(req, res, next) {
    try {
      const { fieldValues, fieldNames, collectionId, tags } = req.body
      console.log(tags)
      const item = await Item.create({
        CollectionId: collectionId,
        ...fieldValues,
        ...fieldNames,
      })

      if (tags) {
        const tagList = await Promise.all(
          tags.map(async (t) => {
            const [tag] = await Tag.findOrCreate({ where: { name: t.text } })
            return tag
          })
        )

        await item.setTags(tagList)
      }
      await indexItem(item)
      return res.json({ message: 'Item created successfully' })
    } catch (e) {
      console.log(e.message)
      next(ApiError.badRequest(e.message))
    }
  }

  async update(req, res) {
    const { id } = req.params
    const { fieldValues, tags } = req.body
    try {
      const item = await Item.findByPk(id)
      if (!item) return res.status(404).json({ error: 'Item not found' })
      const existingTags = await item.getTags()
      if (tags) {
        const tagList = await Promise.all(
          tags.map(async (t) => {
            const [tag] = await Tag.findOrCreate({ where: { name: t.text } })
            return tag
          })
        )
        await item.addTags(tagList)
      }
      if (tags) {
        const tagsToRemove = existingTags.filter((tag) => {
          return !tags.some((t) => t.text === tag.name)
        })
        await item.removeTags(tagsToRemove)
      }
      await item.update(fieldValues)
      await indexItems(item)
      return res.json({ message: 'Item updated successfully' })
    } catch (error) {
      console.error('Error updating Item:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async getAll(req, res) {
    let { collectionId, tagId } = req.query
    let items
    if (!collectionId) {
      items = await Item.findAll({
        attributes: includeItemLikesCount,
        include: [includeCollectionAndUser],
      })
    }
    if (collectionId) {
      items = await Item.findAll({
        attributes: includeItemLikesCount,
        where: { CollectionId: collectionId },
        include: [includeCollectionAndUser],
      })
    }
    if (tagId) {
      const tag = await Tag.findOne({
        where: { id: tagId },
        include: [
          {
            model: Item,
            include: [
              includeCollectionAndUser,
              {
                model: Like,
                attributes: ['id'],
              },
            ],
          },
        ],
      })
      return res.json(tag)
    }

    return res.json(items)
  }

  async getOne(req, res) {
    const { id } = req.params
    const item = await Item.findOne({
      where: { id },
      include: [
        {
          model: Collection,
          include: [
            {
              model: User,
              attributes: ['id', 'name'],
            },
          ],
        },
        {
          model: Like,
          attributes: ['id', 'UserId'],
        },
        {
          model: Tag,
          attributes: ['id', 'name'],
        },
      ],
    })
    return res.json(item)
  }

  async getLatest(req, res) {
    let limit = +req.query.limit || 12
    try {
      const latestRecords = await Item.findAll({
        attributes: ['id', 'requiredField1_value'],
        attributes: {
          include: [
            [
              Sequelize.literal(
                '(SELECT COUNT(*) FROM Likes WHERE Likes.ItemId = Item.id)'
              ),
              'likesCount',
            ],
          ],
        },
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

  async delete(req, res) {
    const { id } = req.params
    try {
      deleteUnindexItem(id)
      res.json({ message: 'Item deleted successfully' })
    } catch (error) {
      console.error(error)
      return res.status(400).json({ error: error.message })
    }
  }
}

module.exports = new ItemController()
