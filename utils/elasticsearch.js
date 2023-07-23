const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://fd55c927228943dfa2a2cd38fa9dd3d1.us-central1.gcp.cloud.es.io',
  auth: {
    username: 'enterprise_search',
    password: 'elastic123',
  },
})

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
    stringField2_value: { type: 'text' },
    stringField3_value: { type: 'text' },
    multilineField1_value: { type: 'text' },
    multilineField2_value: { type: 'text' },
    multilineField3_value: { type: 'text' },
    dateField1_value: { type: 'text' },
    dateField2_value: { type: 'text' },
    dateField3_value: { type: 'text' },
    integerField1_value: { type: 'text' },
    integerField2_value: { type: 'text' },
    integerField3_value: { type: 'text' },
  },
}

const commentMapping = {
  properties: {
    text: { type: 'text' },
    ItemId: { type: 'text' },
  },
}

module.exports = {
  client,
  collectionMapping,
  itemMapping,
  commentMapping,
}
