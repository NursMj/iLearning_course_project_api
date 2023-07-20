const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const collectionRouter = require('./collectionRouter')
const itemRouter = require('./itemRouter')
const topicRouter = require('./topicRouter')
const likeRouter = require('./likeRouter')
const tagRouter = require('./tagRouter')
const commentRouter = require('./commentRouter')

router.use('/user', userRouter)
router.use('/collection', collectionRouter)
router.use('/item', itemRouter)
router.use('/topic', topicRouter)
router.use('/like', likeRouter)
router.use('/tag', tagRouter)
router.use('/comment', commentRouter)

module.exports = router