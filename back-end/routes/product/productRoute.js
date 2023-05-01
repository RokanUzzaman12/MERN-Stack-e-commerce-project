
const express = require('express')
const router = express.Router()
const {fetchAllProducts, addNewProduct,fetchSingleProductById,updateProduct,deleteProduct, fetchSingleProductBySlug} = require('../../controllers/product/productController')
const {checkLogin} = require('../../helpers/auth')

const upload = require('../../helpers/uploads')

router.get('/',fetchAllProducts)
router.get('/:id',fetchSingleProductById)
router.get('/details/:slug',fetchSingleProductBySlug)
router.post('/',upload.single('image'), addNewProduct)
router.put('/:id',upload.single('image'), updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router