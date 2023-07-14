const jwt = require('jsonwebtoken')

module.exports = function () {
  return function (req, res, next) {
    if (req.method == 'OPTIONS') {
      next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1]

      if (!token) {
        return res.status(401).json({ message: 'Not authorized' })
      }
      const ownerId = req.body.userId
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      const isOwner = decoded.id === ownerId
      console.log(ownerId)
      if (decoded.role !== 'ADMIN' && !isOwner) {
        return res.status(403).json({ message: 'No access' })
      }
      
      req.user = decoded
      next()
    } catch (e) {
      res.status(401).json({ message: 'Not authorized' })
    }
  }
}
