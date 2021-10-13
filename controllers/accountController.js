const pool = require('../totosaveDB');
const moment = require('moment');
const { errorMessage, status, successMessage } = require('../helpers/status')


const createAccount = async (req, res) => {
  // const { user_id } = req.user;
  const { name_of_child, date_of_birth, education_level, saving_frequency } = req.body;
  const generateAccountID = () => {
    return 'A' + moment(new Date()).format("YYYYMMDDHHmmssSS")
  };
  const date = moment(new Date());
  const currentbalance = 0;
  const account_id = generateAccountID()
  const account = name_of_child.toLowerCase()

  const addAccount =
    'INSERT INTO accounts (account_id, name_of_child, date_of_birth, education_level, saving_frequency, currentbalance, date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    // 'INSERT INTO accounts (user_id, account_id, name_of_child, date_of_birth, education_level, saving_frequency, currentbalance, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
  const values = [
    // user_id,
    account_id,
    account,
    date_of_birth,
    education_level,
    saving_frequency,
    currentbalance,
    date,
  ];
  try {
    const nameofaccount = await pool.query('SELECT name_of_child FROM accounts');// WHERE user_id=$1', [user_id]);
    const accounts = nameofaccount.rows.map(account => account.name_of_child)
    if (accounts.includes(account)) {
      errorMessage.error = 'Account with that name already exists';
      res.status(status.bad).send(errorMessage);
    } else {
      const newAccount = await pool.query(addAccount, values);
      res.json(newAccount.rows);
    }

  } catch (error) {
    console.error(error.message);
  }
};

// View all accounts for a given user
const getAllAccounts = async (req, res) => {
  // const { user_id } = req.user;
  try {
    const nameofaccount = await pool.query('SELECT name_of_child FROM accounts');// WHERE user_id=$1', [user_id]);
    const accounts = nameofaccount.rows.map(account => account.name_of_child)
    // a =accounts.toLowerCase()
    // console.log(a);
    const getAllUserAccounts = await pool.query(
      'SELECT * FROM accounts'
      //WHERE user_id=$1', [user_id]
    );
    res.json(getAllUserAccounts.rows);
  } catch (err) {
    console.error(err.message);
  }
};





module.exports = {
  createAccount,
  getAllAccounts,
};
