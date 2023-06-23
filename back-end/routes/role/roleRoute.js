const express = require('express')
const router = express.Router()
const {addNewRole,fetchAllRole,updateRole,deleteRole, fetchByUserRole} = require('../../controllers/role/roleController')
const {checkAdminPermission, checkPermission} = require('../../helpers/auth')
router.post('/',addNewRole)
router.get('/',fetchAllRole)
router.get('/user-role',checkAdminPermission,fetchByUserRole)
router.put('/:id',updateRole)
router.delete('/:id',deleteRole)

module.exports = router