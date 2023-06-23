const express = require('express')
const router = express.Router()
const {checkAdminPermission, checkPermission} = require('../../helpers/auth')
const {addNewPermission, fetchAllPermission, deletePermission,updatePermission} = require('../../controllers/menu/permissionController')

router.post('/',[checkAdminPermission,checkPermission('Create Permission')],addNewPermission)
router.get('/',[checkAdminPermission,checkPermission('Manage Permission')],fetchAllPermission)
router.delete('/:id',[checkAdminPermission,checkPermission('Delete Permission')],deletePermission)
router.put('/:id',[checkAdminPermission,checkPermission('Edit Permission')],updatePermission)

module.exports = router