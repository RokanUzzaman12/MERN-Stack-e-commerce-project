const express = require('express')
const router = express.Router()
const {addNewRole,fetchAllRole} = require('../../controllers/role/roleController')

router.post('/',addNewRole)
router.get('/',fetchAllRole)

module.exports = router