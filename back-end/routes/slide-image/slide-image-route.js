const express = require('express')
const router = express.Router()
const {addSlideImage, fetchAllImage,clickUpArrow,clickDownArrow,deleteSlideImage} = require('../../controllers/slide-image/slide-image-controller')
const upload = require('../../helpers/uploads')

router.post('/',upload.single('image'),addSlideImage)
router.get('/',fetchAllImage)
router.delete('/:id',deleteSlideImage)
router.put('/up-arrow/:id',clickUpArrow)
router.put('/down-arrow/:id',clickDownArrow)

module.exports = router