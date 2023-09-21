const mongoose = require('mongoose'); // on invoke mongoose 
const schema = mongoose.Schema; // son schemas aussi 
const bcrypt = require('bcrypt'); // function hashed a password 

const userSchema = schema({ // on initier le schemas pour les users 
  username: { type: String, required: true, unique: true }, // parameters of choices
  local: {
    email: { type: String, required: true, unique: true },  // parameters of choices
    password: { type: String, required: true, unique : true } // parameters of choices
  }
});

userSchema.statics.hashPassword = (password) => { // password hashed
  return bcrypt.hash(password, 12);
};


userSchema.methods.comparePassword = function(password) { // to hash password from user and compare with hash from database 
  return bcrypt.compare(password, this.local.password)
};


const User = mongoose.model('user', userSchema); // on stoke le tout 

module.exports = User; // et on export 