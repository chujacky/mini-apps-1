const express = require('express');
const bodyParser = require('body-parser');
// const multer = require('multer'); 
const app = express();
const flatten = require('./client/app')
// const upload = multer();

app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  var data = req.body;
  console.log('----------', data);
  data = data.json.split("\r\n").join("");
  // var result = flatten.flatten(data);
  console.log(data);
  res.status(200).send(data);
})

app.listen(3000, () => {console.log("CSV Report Generator is listening")});

