const jwt = require('jsonwebtoken')
const { User } = require('../models')

module.exports = function () {
  return async function (req, res, next) {
    if (req.method == 'OPTIONS') {
      next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1]

      if (!token) {
        return res.status(401).json({ message: 'Not authorized' })
      }

      const {userId} = req.body
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      const isOwner = decoded.id === +userId
      const realTimeUser = await User.findOne({ where: { id: decoded.id } })

      if (!realTimeUser) {
        return res.status(403).json({
          message: 'Your account has been deleted. But you can sign up again',
        })
      }
      if (realTimeUser.blocked) {
        return res.status(403).json({
          message:
            'You have been blocked. Please contact support for assistance',
        })
      }
      if (realTimeUser.role !== 'ADMIN' && !isOwner) {
        return res.status(403).json({ message: 'No access' })
      }

      req.user = realTimeUser
      next()
    } catch (e) {
      res.status(401).json({ message: 'Not authorized' })
    }
  }
}
