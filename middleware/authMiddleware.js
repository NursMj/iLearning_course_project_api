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
    try {
      const realTimeUser = await User.findOne({
        where: { email: decoded.email },
      })
      if (!realTimeUser) {
        return res.status(401).json({ message: 'Not authorized' })
      }
      if (realTimeUser.blocked) {
        return res.status(401).json({
          message:
            'You have been blocked. Please contact support for assistance.',
        })
      }
      req.user = realTimeUser
    } catch (error) {
      console.error('Error retrieving data:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
    next()
  } catch (e) {
    res.status(401).json({ message: 'Not authorized' })
  }
}
