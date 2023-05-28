const express = require('express')
const {createAdmin,fetchAllAdmin,logIn,updateRole} = require('../../controllers/admin/adminController')

const router = express.Router()

router.post('/',createAdmin)
router.post('/log-in',logIn)
router.get('/',fetchAllAdmin)
router.put('/:id',updateRole)

module.exports = router