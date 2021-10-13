const { errorMessage, status, successMessage } = require('../helpers/status')
const Helper = require('../helpers/validations.js');
const pool = require('../totosaveDB');
// import pool from '../totoSaveDB'
const moment = require('moment');

//signup a new user of totoSave
const createUser = async (req, res) => {
  const {
    fullname, email, phonenumber, next_of_kin, next_of_kin_contact, password
  } = req.body;

  //   const created_on = moment(new Date());
  if (Helper.isEmpty(phonenumber) || Helper.isEmpty(fullname) || Helper.isEmpty(password)) {
    errorMessage.error = 'Mobile Number,Full name and password fields cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }
  if (!Helper.isValidMobileNumber(phonenumber)) {
    errorMessage.error = 'Please enter a valid Mobile Number';
    return res.status(status.bad).send(errorMessage);
  }
  if (!Helper.validatePassword(password)) {
    errorMessage.error = 'Password must be more than eight(8) characters';
    return res.status(status.bad).send(errorMessage);
  }
  const hashedPassword = Helper.hashPassword(password);
  const generateUserID = () => {
    return 'U' + moment(new Date()).format("YYYYMMDDHHmmssSS")
  }
  const user_id = generateUserID()
  const createNewUser = "INSERT INTO users (user_id, fullname, email, phonenumber, next_of_kin, next_of_kin_contact, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
  const values = [user_id, fullname, email, phonenumber, next_of_kin, next_of_kin_contact, hashedPassword];

  try {
    const newUser = await pool.query(createNewUser, values);
    // const user = rows[0]
    res.json(user.rows[0]);
    return res.status(status.success).send(successMessage);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      errorMessage.error = 'User with that EMAIL or MOBILE NUMBER already exist';
      return res.status(status.conflict).send(errorMessage);
    }
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
    // console.error(error.message);
  }
};


// Get all users - this is an admin functionality
const getAllUsers = async (req, res) => {
  const {user_id} = req.user
  try {
    const getAllUsers = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
    res.json(getAllUsers.rows[0])
  } catch (err) {
    console.error(err.message)
  }
};




module.exports = {
  createUser,
  getAllUsers,
};
