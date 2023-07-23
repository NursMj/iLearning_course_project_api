const { Comment, User } = require('../models')
const { sendMessage } = require('../utils/socket')
const { indexComment, unindexComment } = require('../utils/indexing')

class CommentController {
  async create(req, res) {
    try {
      const { text, itemId } = req.body
      const userId = req.user.id
      const comment = await Comment.create({
        text,
        UserId: userId,
        ItemId: itemId,
      })
      await indexComment(comment)
      sendMessage(itemId, 'commentCreated')
      return res.json(comment)
    } catch (error) {
      console.error('Error creating comment:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async getCommentsByItemId(req, res) {
    try {
      const itemId = req.params.id
      const comments = await Comment.findAll({
        where: { ItemId: itemId },
        include: { model: User, attributes: ['id', 'name'] },
      })
      return res.json(comments)
    } catch (error) {
      console.error('Error getting comments:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async delete(req, res) {
    try {
      const commentId = req.params.id
      const userId = req.user.id
      const comment = await Comment.findByPk(commentId)
      if (!comment) return res.status(404).json({ error: 'Comment not found' })
      if (comment.UserId !== userId) {
        return res
          .status(403)
          .json({ error: 'You are not authorized to delete this comment' })
      }
      await comment.destroy()
      await unindexComment(id)
      return res.json({ message: 'Comment deleted successfully' })
    } catch (error) {
      console.error('Error deleting comment:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

module.exports = new CommentController()
