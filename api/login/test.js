let mongoose = require('mongoose');
let { dbUrl } = require('./config');
let conn = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true});
var kittySchema = mongoose.Schema({
  username: String,
  password: String
});
let User = conn.model("test",kittySchema);

let demo = new User({
  username: 'moyumin',
  password: 'moyumin'
});
demo.save().then((err) => console.log(err));