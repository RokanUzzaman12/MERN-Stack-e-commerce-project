const express = require('express')
const router = express.Router()
const {addSlideImage} = require('../../controllers/slide-image/slide-image-controller')
router.post('/',addSlideImage)

module.exports = router