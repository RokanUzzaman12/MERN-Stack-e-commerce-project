
const express = require('express')
const router = express.Router()
const {fetchAllProducts} = require('../../controllers/product/productController')
const {checkLogin} = require('../../helpers/auth')

router.get('/',fetchAllProducts)

module.exports = router