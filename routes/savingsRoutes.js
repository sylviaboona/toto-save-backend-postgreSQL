const express = require('express');
const router = express.Router();
const SavingsController = require('../controllers/savingsController')
const { verifyToken } = require('../helpers/verifyAuth')

//Saving ROUTES

// GET Saving page from home page
//get all Savings of a given user
router.get('/savings', verifyToken, SavingsController.getAllUserSavings)

// create a new Saving
router.post('/addSaving',  verifyToken, SavingsController.createUserSaving);

//Dashboard page routes
router.get('/savings/homepage', verifyToken, SavingsController.getTotalSavingsPerGuardian);

module.exports = router;