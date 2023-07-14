const jwt = require('jsonwebtoken')
const { User } = require('../models')

module.exports = async function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    try {
      const user = await User.findOne({ where: { email: decoded.email } })
      if (!user) {
        return res.status(401).json({ message: 'Not authorized' })
      }
    } catch (error) {
      console.error('Error retrieving collections:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
    next()
  } catch (e) {
    res.status(401).json({ message: 'Not authorized' })
  }
}
