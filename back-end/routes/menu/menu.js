const express = require('express')
const router = express.Router()
const {addNewModal,fetchAllMenu,deleteMenu} = require('../../controllers/menu/menuController')

router.post('/',addNewModal)
router.get('/',fetchAllMenu)
router.delete('/:id',deleteMenu)

module.exports = router