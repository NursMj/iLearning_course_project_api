const {
  client,
  indexName,
  collectionMapping,
  itemMapping,
  commentMapping,
} = require('./elasticsearch')
const { indexCollections, indexItems, indexComments } = require('./indexing')

async function setupElasticsearch() {
  await client.indices.create({
    index: indexName,
    body: {
      mappings: {
        properties: collectionMapping.properties,
      },
    },
  })
  await client.indices.create({
    index: indexName,
    body: {
      mappings: {
        properties: itemMapping.properties,
      },
    },
  })
  await client.indices.create({
    index: indexName,
    body: {
      mappings: {
        properties: commentMapping.properties,
      },
    },
  })
  await indexCollections()
  await indexItems()
  await indexComments()
}

module.exports = {setupElasticsearch}
