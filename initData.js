const topics = require('./topics.js')
const { Topic, User, Collection, Item } = require('./models')

async function initData() {
  await User.create({
    name: 'Nurs',
    email: 'Nurs@gmail.com',
    password: '123',
    role: 'ADMIN',
  })
  await User.create({
    name: 'Nachu',
    email: 'Nachu@gmail.com',
    password: '123',
  })
  await User.create({
    name: 'Erdan',
    email: 'Erdan@gmail.com',
    password: '123',
  })

  topics.map(async (t) => {
    try {
      const topic = await Topic.create({ name: t })
      console.log('created topic: ', t)
    } catch (error) {
      console.log(error.message)
    }
  })

//   await Collection.create({
//     name: 'My Shoes',
//     desc: 'My shoes desc',
//     topicId: '1',
//     userId: '1',
//     itemFields: {
//       requiredField1_value: 'Name',
//       integerField1_name: 'Size',
//       integerField2_name: 'Price',
//       stringField1_name: 'Brand',
//     },
//   })

//   await Item.create({})
}

initData()
