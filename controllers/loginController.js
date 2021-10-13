const {errorMessage, status, successMessage} = require('../helpers/status');
const Helper = require('../helpers/validations');
const pool = require('../totosaveDB');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// let refreshTokens = []
const loginUser = async (req, res) => {
  const {phonenumber, password} = req.body;
  if (Helper.isEmpty(phonenumber) || Helper.isEmpty(password)) {
    errorMessage.error = 'phone Number or Password detail is missing';
    return res.status(status.bad).send(errorMessage);
  }
  if (
    !Helper.isValidMobileNumber(phonenumber) ||
    !Helper.validatePassword(password)
  ) {
    errorMessage.error = 'Please enter a valid phone Number or Password';
    return res.status(status.bad).send(errorMessage);
  }
  const loginUserQuery = 'SELECT * FROM users WHERE phonenumber = $1';
  try {
    const {rows} = await pool.query(loginUserQuery, [phonenumber]);
    const user = rows[0];
    if (!user) {
      errorMessage.error = 'User with this phonenumber does not exist';
      return res.status(status.notfound).send(errorMessage);
    }
    if (!Helper.comparePassword(user.password, password)) {
      errorMessage.error = 'The password you provided is incorrect';
      return res.status(status.bad).send(errorMessage);
    }

    const token = Helper.generateUserToken(
      user.user_id,
      user.fullname,
      user.email,
      user.phonenumber,
      user.next_of_kin,
      user.next_of_kin_contact,
    );
    
    delete user.password;
    successMessage.data = user;
    successMessage.data.token = token;

    //saving the token in a cookie
    res.cookie('access_token', token, {maxAge: 1800000, httpOnly: true});
    // res.cookie('refresh_token', refreshToken, { maxAge: 3.154e10, httpOnly: true });
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};


module.exports = {
  loginUser,
};
