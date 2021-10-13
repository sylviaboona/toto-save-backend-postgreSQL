const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usersController');
// const { verifyToken } = require('../helpers/verifyAuth');

// users Routes

//get all users
router.get('/users', UserController.getAllUsers);

// create a new user
router.post('/users', UserController.createUser);


//export router
module.exports = router;