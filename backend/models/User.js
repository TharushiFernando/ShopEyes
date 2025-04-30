const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: false, unique: false },
  email: { type: String, required: false, unique: false },
  password: { type: String, required: false },
});

module.exports = mongoose.model('User', userSchema);