var express = require('express');
var app = express();

app.use(express.static('client/dis'));

app.listen(3000);

