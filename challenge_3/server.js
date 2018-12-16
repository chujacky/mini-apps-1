const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const models = require('./model')
const db = require('./data');


app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/', function(req, res) {
  var {name, password, email, id, line1, line2, city, state, zip, phone, card, expiry, cvv, bill, pageStatus} = req.body;
  if (id === 0) {
    db.create({name:name, password: password, email: email})
      .then((data) => {
        res.status(201).json(data.dataValues.id);
      })
      .catch((err) => {
        console.log(err);
      })
  } else if (pageStatus === 2){
    
    db.update({
      line1: line1,
      line2: line2,
      city: city,
      state: state,
      zip: zip,
      phone: phone
    }, {
      where: {
        id: id
      }
    })
  
  } else {
     card = card === '' ? null : card;
     expiry = expiry === '' ? null : expiry;
     cvv = cvv === '' ? null : cvv;
     bill = bill === '' ? null : bill;
     db.update({
      card: card,
      expiry: expiry,
      cvv: cvv,
      billing_zip: bill,
    }, {
      where: {
        id: id
      }
    })
    
  }
    
})

app.listen(3000, () => {console.log('Connected to shopping site')})



