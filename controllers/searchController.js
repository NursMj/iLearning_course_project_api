const { client, indexName } = require('../utils/elasticsearch')

class TagController {
  async search(req, res) {
    try {
      const searchTerm = req.query.q

      const { body } = await client.search({
        index: indexName,
        body: {
          query: {
            multi_match: {
              query: searchTerm,
              fields: [
                'name',
                'desc',
                'text',
                'requiredField1_value',
                'stringField1_value',
                'multilineField1_value',
              ],
            },
          },
        },
      })

      // Extract and send the search results to the client
      const searchResults = body.hits.hits.map((hit) => ({
        index: hit._index,
        type: hit._type,
        id: hit._id,
        score: hit._score,
        data: hit._source,
      }))
      return res.json(searchResults)
    } catch (error) {
      console.error('Error searching:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

module.exports = new TagController()
