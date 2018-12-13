const mysql = require('mysql');

const db = mysql.createConnection({
  user:'root',
  password:'jackyjai',
  database:'sales'
})

db.connect();