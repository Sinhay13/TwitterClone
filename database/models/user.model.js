const mongoose = require('mongoose'); // Importing the mongoose module to interact with the MongoDB database
const schema = mongoose.Schema; // Creating a new schema object from the mongoose module
const bcrypt = require('bcrypt'); // Importing the bcrypt module to hash passwords

// Define the Mongoose schema for users
const userSchema = schema({
  username: { type: String, required: true, unique: true }, // Define the username field for users
  local: { // Define the local field for users
    email: { type: String, required: true, unique: true }, // Define the email field for users
    password: { type: String, required: true, unique : true } // Define the password field for users
  },
  avatar: { type: String, default: '/images/profile-default-svgrepo-com.svg'} // Define the avatar field for users with a default image
});

// Static method to hash a password
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hash(password, 12); // Hash the password with a salt of 12 rounds
};

// Method to compare a password with the hashed password in the database
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.local.password); // Compare the password with the hashed password in the database
};

const User = mongoose.model('user', userSchema); // Creating a new model 'User' from the userSchema

module.exports = User; // Exporting the 'User' model