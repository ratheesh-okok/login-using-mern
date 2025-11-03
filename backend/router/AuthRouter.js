// ...existing code...
const { SignUp, Login } = require('../controllers/AuthController.js')
const { SignupValidation, LoginValidation } = require('../middleware/AuthValidation.js')

const express = require('express')
const router = express.Router()


router.post('/signup', SignupValidation, SignUp)
router.post('/login',LoginValidation,Login)

module.exports = router


