const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), itemController.create)
router.delete('/:id', checkRole('ADMIN'), itemController.delete)
router.get('/', itemController.getAll)
router.get('/:id', itemController.getOne)
router.get('/latest', itemController.getLatest)

module.exports = router
