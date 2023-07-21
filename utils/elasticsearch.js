const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

const indexName = 'collection-item-comment_index'

const collectionMapping = {
  properties: {
    name: { type: 'text' },
    desc: { type: 'text' },
  },
}

const itemMapping = {
  properties: {
    requiredField1_value: { type: 'text' },
    stringField1_value: { type: 'text' },
    multilineField1_value: { type: 'text' },
    // Add other fields as needed for full-text search
  },
}

const commentMapping = {
  properties: {
    text: { type: 'text' },
  },
}

module.exports = {
  client,
  indexName,
  collectionMapping,
  itemMapping,
  commentMapping,
}
