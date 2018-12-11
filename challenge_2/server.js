const express = require('express');
const bodyParser = require('body-parser');
// const multer = require('multer'); 
const app = express();
// const upload = multer();

app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  console.log(req.body)
  res.status(200).send(req.body);
})

app.listen(3000, () => {console.log("CSV Report Generator is listening")});

