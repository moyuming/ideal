let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let { dbUrl } = require('../config');
let conn = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true});
let UserSchema = new Schema({
  username: String,
  password: String
});
module.exports = conn.model("User", UserSchema);