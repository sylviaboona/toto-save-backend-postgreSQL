const express = require('express');
const colors = require('colors');
const path = require('path');
const bodyParser = require('body-parser')
const loginRoutes =require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const savingsRoutes = require('./routes/savingsRoutes');

const cookieParser = require('cookie-parser');

// Initialize http server
const app = express(); 

//access req.body
// app.use(express.json());

//Express session
const expressSession =require('express-session')({
  secret: 'secret',
  // cookie: {maxAge : 60000},
  resave: false,
  saveUninitialized: false
});

// Handle form data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}))

app.use(expressSession);
app.use(cookieParser());
//Tellin the App to use folders and files within the public folder 
app.use(express.static('public'));



//Telling App to use routes delcared in the routes folder 
// Logger that outputs all requests into the console
 
app.use('/totoSaveUser', userRoutes);
app.use('/totoSaveAccount', accountRoutes);
app.use('/totoSaveSaving', savingsRoutes);
app.use('/totoSave', loginRoutes);

//Handling non-existant route / path
app.get('*', (req,res)=>{
  res.send('404! Invalid Request')
});

// Launch the server on port 3500
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`.magenta.bold);
});

module.exports = app;