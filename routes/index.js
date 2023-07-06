const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const collectionRouter = require('./collectionRouter')
const itemRouter = require('./itemRouter')
const topicRouter = require('./topicRouter')

router.use('/user', userRouter)
router.use('/collection', collectionRouter)
router.use('/item', itemRouter)
router.use('/topic', topicRouter)

module.exports = router