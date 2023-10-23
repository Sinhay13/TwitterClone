const User = require('../database/models/user.model'); // Importing the user model

exports.createUser = async (user) => { // Function to add a new user to the database
  try {
    const hashedPassword = await User.hashPassword(user.password); // Hashing the user's password using the hashPassword method defined in the User model
    const newUser = new User({ // Creating a new instance of the "User" model with the provided user data
      username: user.username,
      local: {
        email: user.email,
        password: hashedPassword
      }
    })
    return newUser.save(); // Saving the new user to the database
  } catch(e) {
    throw e; // Throwing an error if there's an issue with creating the user
  }
};

exports.findUserPerEmail = (email) => { // Function to find a user by their email
  return User.findOne({ 'local.email': email }).exec(); // Using the findOne method to find a user with the provided email
}

exports.findUserPerId = (id) => { // Function to find a user by their ID
  return User.findById(id).exec(); // Using the findById method to find a user with the provided ID
}