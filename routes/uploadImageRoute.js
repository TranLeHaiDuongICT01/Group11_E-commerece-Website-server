const router = require('express').Router()
const { checkAdmin, checkAuth } = require('../middleware/checkAuth')
const { uploadImage, deleteImage } = require('../controllers/uploadImageController')
router.post('/upload', checkAuth, checkAdmin, uploadImage)

router.post('/destroy', checkAuth, checkAdmin, deleteImage)
module.exports = router