const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const models = require('./model')
const db = require('./data');


app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/', function(req, res) {
  if (req.body.id === 0) {
    var form1 = [req.body.name, req.body.password, req.body.email];
    var queryString = `INSERT INTO sales (name,password,email) VALUES ('${req.body.name}','${req.body.password}','${req.body.email}');`
      db.query(queryString, (err, result) =>{
        if (err){
          console.log(err, result);
          // cb(error);
        } else {
          // cb(null, result);
          console.log(result);
          res.json(result);
        }
      });
  } else if (req.body.submit === 1){
    var form2  = [req.body.line1, req.body.line2, req.body.city, req.body.state, req.body.zip, req.body.phone, req.body.card, req.body.expiry, req.body.cvv, req.body.bill];
    var queryString = 'UPDATE sales SET '
    queryString += `line1 = '${req.body.line1}',line2 ='${req.body.line2}', city='${req.body.city}',state='${req.body.state}',zip_code=${req.body.zip},phone=${req.body.phone} `
    queryString += `WHERE id = ${req.body.id}`
    db.query(queryString, (err, result) =>{
        if (err){
          console.log(err, result);
          // cb(error);
        } else {
          // cb(null, result);
          console.log(result);
          res.json(result);
        }
      });
  
  } else {
    var queryString = 'UPDATE sales SET '
    queryString += `card = ${req.body.card},expiry_date ='${req.body.expiry}', billing_zip=${req.body.bill} `
    queryString += `WHERE id = ${req.body.id}`
    db.query(queryString, (err, result) =>{
        if (err){
          console.log(err, result);
          // cb(error);
        } else {
          // cb(null, result);
          console.log(result);
          res.json(result);
        }
      });
  
  }
    
})

app.listen(3000, () => {console.log('Connected to shopping site')})



