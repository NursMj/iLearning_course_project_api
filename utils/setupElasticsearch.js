const {
  client,
  collectionMapping,
  itemMapping,
  commentMapping,
} = require('./elasticsearch')
const { indexCollection, indexItem, indexComment } = require('./indexing')
const { Collection, Item, Comment } = require('../models')

async function setupElasticsearch() {
  await client.indices.delete({
    index: 'collections',
  })
  await client.indices.create({
    index: 'collections',
    body: {
      mappings: {
        properties: collectionMapping.properties,
      },
    },
  })
  await client.indices.delete({
    index: 'items',
  })
  await client.indices.create({
    index: 'items',
    body: {
      mappings: {
        properties: itemMapping.properties,
      },
    },
  })
  await client.indices.delete({
    index: 'comments',
  })
  await client.indices.create({
    index: 'comments',
    body: {
      mappings: {
        properties: commentMapping.properties,
      },
    },
  })

  const collections = await Collection.findAll()
  collections.map(async (collection) => await indexCollection(collection))

  const items = await Item.findAll()
  items.map(async (item) => await indexItem(item))

  const comments = await Comment.findAll()
  comments.map(async (comment) => await indexComment(comment))
}

setupElasticsearch()
