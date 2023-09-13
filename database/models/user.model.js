const mongoose = require('mongoose'); // on invoque mongoose 
const schema = mongoose.Schema; // son schemas aussi 

const userSchema = schema({ // on initier le schemas pour les users 
  username: { type: String, required: true },
  local: {
    email: { type: String, required: true },
    password: { type: String, required: true }
  }
});

const User = mongoose.model('user', userSchema); // on stoke le tout 

module.exports = User; // et on export 