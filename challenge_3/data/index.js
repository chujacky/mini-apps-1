const mysql = require('mysql');

const db = mysql.createConnection({
  user:'student',
  password:'student',
  database:'Sales'
})

db.connect();

module.exports = db;