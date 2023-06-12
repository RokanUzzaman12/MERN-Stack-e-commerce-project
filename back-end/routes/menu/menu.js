const express = require('express')
const router = express.Router()
const {checkAdminPermission, checkPermission} = require('../../helpers/auth')
const {addNewModal,fetchAllMenu,deleteMenu,updateMenu} = require('../../controllers/menu/menuController')

router.post('/',[checkAdminPermission,checkPermission('Add New Menu')],addNewModal)
router.get('/',[checkAdminPermission,checkPermission('Manage Menu')],fetchAllMenu)
router.put('/:id',[checkAdminPermission,checkPermission('Edit Menu')],updateMenu)
router.delete('/:id',[checkAdminPermission,checkPermission('Delete Menu')],deleteMenu)

module.exports = router