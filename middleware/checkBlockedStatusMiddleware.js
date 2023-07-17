const { User } = require('../models')

module.exports = async (req, res, next) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (user && user.blocked) {
      return res.status(401).json({
        message:
          'You have been blocked. Please contact support for assistance.',
      })
    }
    next()
  } catch (error) {
    console.error('Error fetching user:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
