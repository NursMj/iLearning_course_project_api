const { client } = require('../utils/elasticsearch')
const { Collection, Item, User, Like } = require('../models')
const _ = require('lodash')

const filedsToSearch = [
  'name',
  'desc',
  'text',
  'requiredField1_value',
  'stringField1_value',
  'stringField2_value',
  'stringField3_value',
  'multilineField1_value',
  'multilineField2_value',
  'multilineField3_value',
  'dateField1_value',
  'dateField2_value',
  'dateField3_value',
  'integerField1_value',
  'integerField2_value',
  'integerField3_value',
]

const includeCollectionUserLikes = [
  {
    model: Collection,
    attributes: ['id', 'name'],
    include: [
      {
        model: User,
        attributes: ['id', 'name'],
      },
    ],
  },
  {
    model: Like,
    attributes: ['id'],
  },
]

class TagController {
  async search(req, res) {
    const searchText = req.query.searchText

    try {
      const body = await client.search({
        index: ['collections', 'items', 'comments'],
        body: {
          query: {
            multi_match: {
              query: searchText,
              fields: filedsToSearch,
            },
          },
        },
      })

      const hits = [...body.hits.hits]
      let resultsCollections = []
      let resultsItems = []
      await Promise.all(
        hits.map(async (hit) => {
          if (hit._index === 'collections') {
            resultsCollections.push(
              await Collection.findOne({
                where: { id: hit._id },
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
              })
            )
          } else if (hit._index === 'items') {
            resultsItems.push(
              await Item.findOne({
                where: { id: hit._id },
                include: includeCollectionUserLikes,
              })
            )
          } else if (hit._index === 'comments') {
            resultsItems.push(
              await Item.findOne({
                where: {
                  id: hit._source.ItemId,
                  include: includeCollectionUserLikes,
                },
              })
            )
          }
        })
      )
      const results = {
        collections: _.uniqBy(resultsCollections, 'id'),
        items: _.uniqBy(resultsItems, 'id'),
      }
      res.json(results)
    } catch (error) {
      console.error('Error searching:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

module.exports = new TagController()
