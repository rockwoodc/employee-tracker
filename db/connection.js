const mysql = require('mysql2');
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Password1!',
      database: 'business'
    },
    console.log('Connected to the business database.')
  );

  module.exports = db;