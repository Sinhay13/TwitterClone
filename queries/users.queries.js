const User = require('../database/models/user.model'); // we call user from the model

exports.createUser = async (user) => { // function to add user in the database
  try {
    const hashedPassword = await User.hashPassword(user.password);
    const newUser = new User({
      username: user.username,
      local: {
        email: user.email,
        password: hashedPassword
      }
    })
    return newUser.save();
  } catch(e) {
    throw e;// no next because it is not a middleware 
  }
};

exports.findUserPerEmail = (email) => {
  return User.findOne({ 'local.email': email }).exec(); // to find user with mail (see config)
}

exports.findUserPerId = (id) => { // to find user with Id (see config)
  return User.findById(id).exec();
}