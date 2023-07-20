const topics = require('./topics.js')
const { Topic, User } = require('./models')
const db = require('./models')

const bcrypt = require('bcrypt')



async function initData() {

  await db.sequelize.authenticate()
  await db.sequelize.sync({force : true})

  const hashPassword = await bcrypt.hash('123', 5)

  await User.create({
    name: 'Test',
    email: 'test@gmail.com',
    password: hashPassword,
    role: 'ADMIN',
  })
  await User.create({
    name: 'Nurs',
    email: 'Nurs@gmail.com',
    password: hashPassword,
    role: 'ADMIN',
  })
  await User.create({
    name: 'Nachu',
    email: 'Nachu@gmail.com',
    password: hashPassword,
  })
  await User.create({
    name: 'Erdan',
    email: 'Erdan@gmail.com',
    password: hashPassword,
  })

  topics.map(async (t) => {
    try {
      const topic = await Topic.create({ name: t })
      console.log('created topic: ', t)
    } catch (error) {
      console.log(error.message)
    }
  })
}

initData()
