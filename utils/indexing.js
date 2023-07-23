const { client } = require('./elasticsearch')

async function indexCollection(collection) {
  await client.index({
    index: 'collections',
    id: collection.id,
    body: {
      name: collection.name,
      desc: collection.desc,
    },
  })
}

async function unindexCollection(id) {
  await client.delete({
    index: 'collections',
    id: id,
  })
}

async function indexItem(item) {
  await client.index({
    index: 'items',
    id: item.id,
    body: {
      requiredField1_value: item.requiredField1_value,
      stringField1_value: item.stringField1_value,
      stringField2_value: item.stringField2_value,
      stringField3_value: item.stringField_3value,
      multilineField1_value: item.multilineField1_value,
      multilineField2_value: item.multilineField2_value,
      multilineField3_value: item.multilineField3_value,
      integerField1_value: item.integerField1_value,
      integerField2_value: item.integerField2_value,
      integerField3_value: item.integerField3_value,
      dateField1_value: item.dateField1_value,
      dateField2_value: item.dateField2_value,
      dateField3_value: item.dateField3_value,
    },
  })
}

async function unindexItem(id) {
  await client.delete({
    index: 'items',
    id: id,
  })
}

async function indexComment(comment) {
  await client.index({
    index: 'comments',
    id: comment.id,
    body: {
      text: comment.text,
      ItemId: comment.ItemId,
    },
  })
}

async function unindexComment(id) {
  await client.delete({
    index: 'comments',
    id: id,
  })
}

module.exports = {
  indexCollection,
  unindexCollection,
  indexItem,
  unindexItem,
  indexComment,
  unindexComment
}
