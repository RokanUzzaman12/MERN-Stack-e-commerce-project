const express = require('express')
const router = express.Router()
const {checkAdminPermission, checkPermission} = require('../../helpers/auth')
const {createCategory,fetchAllCategory} = require('../../controllers/categoryController/categoryController')

router.post('/',createCategory)
router.get('/',fetchAllCategory)


module.exports = router