const { Item, Collection, Comment } = require('../models')
const { unindexItem, unindexComment, unindexCollection } = require('./indexing')

const deleteUnindexItem = async (id) => {
  const commentsToDelete = await Comment.findAll({
    where: { ItemId: id },
  })
  await Comment.destroy({
    where: { ItemId: id },
  })
  commentsToDelete.map(async (comment) => await unindexComment(comment.id))
  await Item.destroy({
    where: { id },
  })
  await unindexItem(id)
}

const deleteUnindexCollection = async (id) => {
  const itemsToDelete = await Item.findAll({
    where: { CollectionId: id },
  })
  itemsToDelete.map((item) => deleteUnindexItem(item.id))
  await Collection.destroy({
    where: { id },
  })
  await unindexCollection(id)
}

module.exports = { deleteUnindexItem, deleteUnindexCollection }
