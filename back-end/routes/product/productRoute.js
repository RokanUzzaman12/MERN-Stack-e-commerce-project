
const express = require('express')
const router = express.Router()
const {fetchAllProducts} = require('../../controllers/product/productController')

router.get('/',fetchAllProducts)

module.exports = router