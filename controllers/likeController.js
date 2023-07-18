const { Like } = require('../models')

class LikeController {
  async create(req, res) {
    const { userId, itemId } = req.body
    const exists = await Like.findOne({
      where: { UserId: userId, ItemId: itemId },
    })
    if (exists) {
      return res.json({ message: 'Already liked it' })
    }
    const like = await Like.create({ UserId: userId, ItemId: itemId })
    return res.json(like)
  }

  async delete(req, res) {
    const { id } = req.params
    console.log('id: ' + id)
    await Like.destroy({
      where: { id },
    })
    res.json({ message: 'Like deleted successfully' })
  }
}

module.exports = new LikeController()
