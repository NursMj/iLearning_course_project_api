const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, commentController.create)
router.get('/:id', commentController.getCommentsByItemId)
router.delete('/:id',authMiddleware, commentController.delete)

module.exports = router
