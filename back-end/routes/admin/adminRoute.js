const express = require('express')
const {createAdmin,fetchAllAdmin,logIn} = require('../../controllers/admin/adminController')

const router = express.Router()

router.post('/',createAdmin)
router.post('/log-in',logIn)
router.get('/',fetchAllAdmin)

module.exports = router