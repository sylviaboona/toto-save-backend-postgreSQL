const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Login = require('../controllers/loginController')

//user login
router.post('/login', Login.loginUser);

module.exports = router;