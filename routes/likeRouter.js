const Router = require('express')
const router = new Router()
const likeController = require('../controllers/likeController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, likeController.create)
router.delete('/:id', authMiddleware, likeController.delete)

module.exports = router
