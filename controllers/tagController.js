const { Tag, Item } = require('../models')
const Sequelize = require('sequelize')

class TagController {
  async getAll(req, res) {
    try {
      const tags = await Tag.findAll()

      return res.json(tags)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Server error' })
    }
  }
}

module.exports = new TagController()
