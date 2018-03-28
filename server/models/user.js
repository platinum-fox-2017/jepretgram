// require('dotenv').config()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: String,
  name: String,
  password: String
});

let User = mongoose.model('User', userSchema);

module.exports = User;
