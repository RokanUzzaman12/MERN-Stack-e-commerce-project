const express = require('express')
const router = express.Router()

const {addNewModal} = require('../../controllers/menu/permissionController')

router.post('/',addNewModal)

module.exports = router