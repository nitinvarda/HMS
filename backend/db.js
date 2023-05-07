var mysql = require('mysql');
require('dotenv').config();

console.log(process.env.HOST)

var con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
  });
  
  //Connecting To Database
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL");
  });

module.exports = con;