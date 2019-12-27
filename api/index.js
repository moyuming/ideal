const express = require('express')
const bodyParser = require('body-parser');

let login = require('./login')
const app = express()
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/login', login)
module.exports = app