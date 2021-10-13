const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/accountController')
// const {verifyToken} = require('../helpers/verifyAuth')

//Account ROUTES

//get all Accounts of a given user
router.get('/accounts',  AccountController.getAllAccounts)
// router.get('/accounts', verifyToken, AccountController.getAllAccounts)

// create a new Account
router.post('/addAccount',  AccountController.createAccount);
// router.post('/addAccount',  verifyToken, AccountController.createAccount);



module.exports = router;