const Router = require('express')
const router = new Router()
const collectionController = require('../controllers/collectionController')
const checkAccess = require('../middleware/checkAccessMiddleware')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post(
  '/',
  upload.single('img'),
  checkAccess(),
  collectionController.create
)
router.get('/', collectionController.getAll)
router.get('/largest', collectionController.getLargest)
router.get('/:id', collectionController.getOne)
router.get('/user/:id', collectionController.getUserCollections)
router.delete('/:id', checkAccess(), collectionController.delete)

module.exports = router
