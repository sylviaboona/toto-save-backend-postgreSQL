
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


/**
 * Hash Password Method
 * @param {string} password
 * @returns {string} returns hashed password
 */
const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}
/**
 * comparePassword
 * @param {string} hashPassword 
 * @param {string} password 
 * @returns {Boolean} return True or False
 */
const comparePassword = (hashPassword, password) => {
  return bcrypt.compareSync(password, hashPassword);
}


/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

const isValidMobileNumber = (phonenumber) => {
  const regEx = /^[0-9]{10}$/;
  return regEx.test(phonenumber)
}

/**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
const validatePassword = (password) => {
  if (password.length <= 8 || password === '') {
    return false;
  } return true;
};
/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  } return true;
};

/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const empty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
};

const generateUserToken = (user_id, fullname, email, phonenumber, next_of_kin, next_of_kin_contact) => {
  const token = jwt.sign({
    user_id,
    fullname,
    email,
    phonenumber,
    next_of_kin,
    next_of_kin_contact,
  },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30m' });
  return token;

};



module.exports = {
  hashPassword,
  isValidEmail,
  isValidMobileNumber,
  validatePassword,
  comparePassword,
  isEmpty,
  empty,
  generateUserToken,
};