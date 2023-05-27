const express = require('express')
const router = express.Router()
const {checkAdminPermission, checkPermission} = require('../../helpers/auth')
const {addNewModal,fetchAllMenu,deleteMenu,updateMenu} = require('../../controllers/menu/menuController')

router.post('/',addNewModal)
router.get('/',checkPermission('good to go'),fetchAllMenu)
router.put('/:id',updateMenu)
router.delete('/:id',deleteMenu)

module.exports = router