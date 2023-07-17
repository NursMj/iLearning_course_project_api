const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const checkAccess = require('../middleware/checkAccessMiddleware')
const checkBlockedStatus = require('../middleware/checkBlockedStatusMiddleware')

router.post('/registration', userController.registration)
router.post('/login', checkBlockedStatus, userController.login)
router.put('/update-by-admin/:id', checkAccess(), userController.updateByAdmin)
router.put('/update-by-user/:id', checkAccess(), userController.updateByUser)
router.delete('/:id', checkAccess(), userController.delete)
router.get('/', checkAccess(), userController.getAll)
router.get('/auth', authMiddleware, userController.check)

module.exports = router
