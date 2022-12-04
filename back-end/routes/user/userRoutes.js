const express = require('express')
const {createUser,logIn} = require('../../controllers/user/userController')
const router = express.Router()

router.post('/',createUser)
router.post('/login',logIn)

module.exports = router