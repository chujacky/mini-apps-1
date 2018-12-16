// const mysql = require('mysql');

// const db = mysql.createConnection({
//   user:'root',
//   password:'jackyjai',
//   database:'Sales'
// })

// db.connect();

const Sequelize = require('sequelize');
const db = new Sequelize('Sales', 'root', 'jackyjai');

db.authenticate()
  .then(() => {
    console.log('Connection Success');
  })
  .catch(err => {
    console.log(err);
  })

var Sale = db.define('sale', {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  line1: Sequelize.STRING,
  line2: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.INTEGER,
  phone: Sequelize.INTEGER,
  card: {
    type:Sequelize.INTEGER,
    defaultValue:null
  },
  expiry: {
    type:Sequelize.DATE,
    defaultValue:null
  },
  cvv: {
    type:Sequelize.INTEGER,
    defaultValue:null
  },
  billing_zip: {
    type:Sequelize.INTEGER,
    defaultValue:null
  }
})

Sale.sync({force:true});


module.exports = Sale;

