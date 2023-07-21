const { Collection, Item, Comment } = require('../models')
const {
  client,
  indexName,
} = require('./elasticsearch')

async function indexCollections() {
  const collections = await Collection.findAll()

  for (const collection of collections) {
    await client.index({
      index: indexName,
      id: collection.id,
      body: {
        name: collection.name,
        desc: collection.desc,
      },
    })
  }
}

async function indexItems() {
  const items = await Item.findAll()

  for (const item of items) {
    await client.index({
      index: indexName,
      id: item.id,
      body: {
        requiredField1_value: item.requiredField1_value,
        stringField1_value: item.stringField1_value,
        multilineField1_value: item.multilineField1_value,
      },
    })
  }
}

async function indexComments() {
  const comments = await Comment.findAll()

  for (const comment of comments) {
    await client.index({
      index: indexName,
      id: comment.id,
      body: {
        text: comment.text,
      },
    })
  }
}



module.exports = {
  indexCollections,
  indexItems,
  indexComments,
}
