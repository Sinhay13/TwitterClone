const mongoose = require('mongoose'); // on invoke mongoose 
const schema = mongoose.Schema; // son schemas aussi 
const bcrypt = require('bcrypt'); // function hashed a password 

const userSchema = schema({ // on initier le schemas pour les users 
  username: { type: String, required: true },
  local: {
    email: { type: String, required: true },
    password: { type: String, required: true }
  }
});

userSchema.statics.hashPassword = (password) => { // password hashed
  return bcrypt.hash(password, 12);
};

const User = mongoose.model('user', userSchema); // on stoke le tout 

module.exports = User; // et on export 