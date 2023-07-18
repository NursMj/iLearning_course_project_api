const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const collectionRouter = require('./collectionRouter')
const itemRouter = require('./itemRouter')
const topicRouter = require('./topicRouter')
const likeRouter = require('./likeRouter')

router.use('/user', userRouter)
router.use('/collection', collectionRouter)
router.use('/item', itemRouter)
router.use('/topic', topicRouter)
router.use('/like', likeRouter)

module.exports = router