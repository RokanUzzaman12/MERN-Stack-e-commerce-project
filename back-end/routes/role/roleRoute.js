const express = require('express')
const router = express.Router()
const {addNewRole,fetchAllRole,updateRole,deleteRole} = require('../../controllers/role/roleController')

router.post('/',addNewRole)
router.get('/',fetchAllRole)
router.put('/:id',updateRole)
router.delete('/:id',deleteRole)

module.exports = router