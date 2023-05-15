const express = require('express')
const router = express.Router()
const {addNewModal,fetchAllMenu,deleteMenu,updateMenu} = require('../../controllers/menu/menuController')

router.post('/',addNewModal)
router.get('/',fetchAllMenu)
router.put('/:id',updateMenu)
router.delete('/:id',deleteMenu)

module.exports = router