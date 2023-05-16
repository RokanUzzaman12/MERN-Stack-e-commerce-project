const express = require('express')
const router = express.Router()

const {addNewModal, fetchAllPermission, deletePermission,updatePermission} = require('../../controllers/menu/permissionController')

router.post('/',addNewModal)
router.get('/',fetchAllPermission)
router.delete('/:id',deletePermission)
router.put('/:id',updatePermission)

module.exports = router