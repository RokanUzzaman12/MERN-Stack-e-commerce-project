const express = require('express')
const {verifyEveryTime, verifyAdminEveryTime} = require('../../helpers/auth')

const router = express.Router()

router.post('/',verifyEveryTime)
router.post('/admin',verifyAdminEveryTime)


module.exports = router

