const express = require('express')
const router = express.Router()

const {addNewPermission, fetchAllPermission, deletePermission,updatePermission} = require('../../controllers/menu/permissionController')

router.post('/',addNewPermission)
router.get('/',fetchAllPermission)
router.delete('/:id',deletePermission)
router.put('/:id',updatePermission)

module.exports = router