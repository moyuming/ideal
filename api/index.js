const express = require('express')
const bodyParser = require('body-parser');
let api = require('./api')
const app = express()
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', api)
module.exports = app