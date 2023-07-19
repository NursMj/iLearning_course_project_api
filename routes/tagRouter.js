const Router = require('express')
const router = new Router()
const tagController = require('../controllers/tagController')

router.get('/', tagController.getAll)

module.exports = router