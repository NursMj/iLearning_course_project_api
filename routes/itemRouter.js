const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')
const checkAccess = require('../middleware/checkAccessMiddleware')

router.post('/', checkAccess(), itemController.create)
router.put('/:id', checkAccess(), itemController.update)
router.delete('/:id', checkAccess(), itemController.delete)
router.get('/', itemController.getAll)
router.get('/latest', itemController.getLatest)
router.get('/:id', itemController.getOne)

module.exports = router
