const express = require('express');
const bodyParser = require('body-parser');
// const multer = require('multer'); 
const app = express();
const flatten = require('./parser');
const createCSV = require('./parser');
const HTTPsify= require('./parser');
// const upload = multer();

app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  var data = req.body;

  data = JSON.parse(data.json.split("\r\n").join(""));
  data = flatten.flatten(data);
  data = createCSV.createCSV(data);
  data = HTTPsify.HTTPsify(data);
  res.status(200).send(data);
})

app.listen(3000, () => {console.log("CSV Report Generator is listening")});

