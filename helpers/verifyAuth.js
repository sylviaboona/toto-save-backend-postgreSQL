
const { errorMessage, status } = require('./status');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

/**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */

const verifyToken = async (req, res, next) => {
    const {access_token} = req.cookies;
    // const authHeader = req.headers['authorization'];
    // const token = authHeader.split(' ')[1];
    if (!access_token) {
        // redirect to login page
        // errorMessage.error = 'access_token not provided';
        // return res.status(status.bad).send(errorMessage);
        return next();
    }
    try {
        const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
        req.user = {
            user_id: decoded.user_id,
            fullname: decoded.fullname,
            email: decoded.email,
            phonenumber: decoded.phonenumber,
            next_of_kin: decoded.next_of_kin,
            next_of_kin_contact: decoded.next_of_kin_contact,
        };
        next();

        
    } catch (error) {
        errorMessage.error = 'Authentication Failed';
        return res.status(status.unauthorized).send(errorMessage);
        // res.clearCookie('token')
    }
};

module.exports = { verifyToken };