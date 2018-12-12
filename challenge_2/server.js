const express = require('express');
const bodyParser = require('body-parser');
const flatten = require('./parser');
const createCSV = require('./parser');
const HTTPsify= require('./parser');
const multer = require('multer'); 
const app = express();
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });

app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', upload.single('json'), (req, res) => {
  var path = req.file.path;
  fs.readFile(path, (err, data) => {
    if (err) {
      throw err;
    }
    data = JSON.parse(data);
    data = flatten.flatten(data);
    data = createCSV.createCSV(data);
    data = HTTPsify.HTTPsify(data);
    res.status(200).send(data);
  })
})

app.listen(3000, () => {console.log("CSV Report Generator is listening")});

