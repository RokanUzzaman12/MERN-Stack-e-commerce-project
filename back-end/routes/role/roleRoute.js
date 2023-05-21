const express = require('express')
const router = express.Router()
const {addNewRole,fetchAllRole,deleteRole} = require('../../controllers/role/roleController')

router.post('/',addNewRole)
router.get('/',fetchAllRole)
router.delete('/:id',deleteRole)

module.exports = router