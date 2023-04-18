const express = require('express')
const {verifyEveryTime} = require('../../helpers/auth')

const router = express.Router()

router.post('/',verifyEveryTime)


module.exports = router

