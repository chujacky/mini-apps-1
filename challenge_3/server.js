const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const models = require('./model')
const db = require('./data');


app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/', function(req, res) {
  var form1 = [req.body.name, req.body.password, req.body.email];
  var queryString = 'INSERT INTO sales (name,password,email) VALUES (?,?,?)'
    db.query(queryString, form1, (err, reuslt) =>{
      if (error){
        console.log(error);
        // cb(error);
      } else {
        // cb(null, result);
        console.log(result);
      }
    })

})

app.listen(3000, () => {console.log('Connected to shopping site')})

