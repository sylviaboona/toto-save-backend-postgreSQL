const pool = require('../totosaveDB');
const moment = require('moment');


// Get all a user's Savings
const getAllUserSavings = async (req, res) => {
  // const {user_id} = req.user;
  try {
    const getAllSavings = await pool.query(`SELECT * FROM savings` ); //WHERE user_id = $1`,[user_id]
    res.json(getAllSavings.rows)
  } catch (err) {
    console.error(err.message)
  }
};

//user adds an Savings 
const createUserSaving = async (req, res) => {
  // const {user_id} = req.user;
  const {
     name_of_child, amount,
  } = req.body;
  const generateUniqueID = () => {
    return 'S' + moment(new Date()).format("YYYYMMDDHHmmssSS")
  }
  const date = moment(new Date());
  const savings_id = generateUniqueID()
  const addSavings = `INSERT INTO savings (savings_id, name_of_child, amount, date) VALUES ($1, $2, $3, $4) RETURNING *`;
  // const addSavings = `INSERT INTO savings (user_id, savings_id, name_of_child, amount, date) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [savings_id, name_of_child, amount, date];

  try {
    const newSavings = await pool.query(addSavings, values);
    const updateAccount = await pool.query("UPDATE accounts SET currentbalance = currentbalance + $1 WHERE name_of_child = $2", [amount, name_of_child, ]);
    res.json(newSavings.rows)

  } catch (error) {
    console.error(error.message);
  }
};

const getTotalSavingsPerGuardian = async (req, res) => {
    // const {user_id} = req.user;
    try{ 
        const totalIncome = await pool.query('SELECT COALESCE(SUM(currentbalance), 0) as totalIncomes FROM accounts');// WHERE user_id = $1', [user_id]);
        res.json(totalIncome.rows[0])
        
    } catch(err){
        console.error(err.message)
    }
  };

module.exports = {
  createUserSaving,
  getAllUserSavings,
  getTotalSavingsPerGuardian
}