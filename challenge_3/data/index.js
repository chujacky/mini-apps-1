const mysql = require('mysql');

const db = mysql.createConnection({
  user:'root',
  password:'jackyjai',
  database:'Sales'
})

db.connect();

module.exports = db;