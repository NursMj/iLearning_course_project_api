const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const generateJwt = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      darkMode: user.darkMode,
      language: user.language,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '24h',
    }
  )
}

function getUpdates(body, fields) {
  const updates = {}
  fields.forEach((field) => {
    if (body[field] !== undefined) {
      updates[field] = body[field]
    }
  })
  return updates
}

class UserController {
  async registration(req, res, next) {
    const { name, email, password, role } = req.body
    if (!email || !password || !name) {
      return next(ApiError.badRequest('Fill in required fields'))
    }
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return next(ApiError.badRequest('User with this email already exists'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({
      name,
      email,
      role,
      password: hashPassword,
    })
    const token = generateJwt(user)
    return res.json({ token })
  }

  async login(req, res, next) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return next(ApiError.badRequest('User with this email does not exist'))
    }

    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.badRequest('Wrong password'))
    }
    const token = generateJwt(user)
    return res.json({ token })
  }

  async check(req, res, next) {
    const token = generateJwt(req.user)
    return res.json({ token })
  }

  async getAll(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'role', 'email', 'blocked']
    })
    return res.json(users)
  }

  async updateByAdmin(req, res) {
    const { id } = req.params
    const updates = getUpdates(req.body, ['role', 'blocked'])

    try {
      const [updatedRowsCount] = await User.update(updates, {
        where: { id },
      })
      if (updatedRowsCount === 0) {
        return res.status(404).json({ error: 'User not found' })
      }
      return res.json({ message: 'User updated successfully' })
    } catch (error) {
      console.error('Error updating User:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async updateByUser(req, res) {
    const { id } = req.params
    const updates = getUpdates(req.body, ['darkMode', 'language'])

    try {
      const [updatedRowsCount] = await User.update(updates, {
        where: { id },
      })
      if (updatedRowsCount === 0) {
        return res.status(404).json({ error: 'Record not found' })
      }
      return res.json({ message: 'Record updated successfully' })
    } catch (error) {
      console.error('Error updating record:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async delete(req, res) {
    const { id } = req.params
    await User.destroy({
      where: { id },
    })
    res.json({ message: 'User deleted successfully' })
  }
}

module.exports = new UserController()
