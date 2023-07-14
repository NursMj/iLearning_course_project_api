const Router = require('express')
const router = new Router()
const topicController = require('../controllers/topicController')
const checkAccess = require('../middleware/checkAccessMiddleware')

router.post('/', checkAccess(), topicController.create)
router.delete('/', checkAccess(), topicController.delete)
router.get('/', topicController.getAll)

module.exports = router
