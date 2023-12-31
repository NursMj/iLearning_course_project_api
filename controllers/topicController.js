const { Topic } = require('../models')
const ApiError = require('../error/ApiError')

class TopicController {
  async create(req, res) {
    const { name } = req.body
    const topic = await Topic.create({ name })
    return res.json(topic)
  }

  async delete(req, res) {
    const { id } = req.params
    await Topic.destroy({ where: { id } })
    res.json({ message: 'Topic deleted successfully' })
  }

  async getAll(req, res) {
    const topics = await Topic.findAll()
    return res.json(topics)
  }
}

module.exports = new TopicController()
