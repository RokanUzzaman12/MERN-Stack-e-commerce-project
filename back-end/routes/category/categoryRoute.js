const express = require('express')
const router = express.Router()
const {checkAdminPermission, checkPermission} = require('../../helpers/auth')
const {createCategory,fetchAllCategory, updateCategory,deleteCategory} = require('../../controllers/categoryController/categoryController')

router.post('/',[checkAdminPermission, checkPermission('Create Category ')],createCategory)
router.get('/',[checkAdminPermission,checkPermission('Category List')],fetchAllCategory)
router.put('/:Id',[checkAdminPermission,checkPermission('Edit Category ')],updateCategory)
router.delete('/:Id',[checkAdminPermission,checkPermission('Delete Category ')],deleteCategory)


module.exports = router