const express = require('express')
const router = express.Router()
const {addNewModal} = require('../../controllers/menu/menuController')

router.post('/',addNewModal)

module.exports = router