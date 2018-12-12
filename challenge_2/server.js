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
  data = req.body;

  // var path = req.file.path;
  // console.log(path);
  // fs.readFile(path, (err, data) => {
  //   if (err) {
  //     throw err;
  //   }
  //   data = JSON.parse(data)
    data = flatten.flatten(data);
    data = createCSV.createCSV(data);
    fs.writeFile('client/downloads/data.csv', data, (err) => {
      if (err) throw err;
      console.log('File saved')
    })
    res.status(200).send(data);
  // })

  // res.status(200).send('hi');
})

app.listen(3000, () => {console.log("CSV Report Generator is listening")});

