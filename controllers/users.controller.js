const { createUser } = require('../queries/users.queries'); // We call the function to create user from queries

exports.signupForm = (req, res, next) => { // signup to send the for to create user
  res.render('users/user-form', { errors: null }); // end point to form with errors include
}

exports.signup = async (req, res, next) => { // To add a user in the database
  const body = req.body;
  try {
    const user = await createUser(body);
    res.redirect('/');
  } catch(e) {
    res.render('users/user-form', { errors: [ e.message ] }); // no next because it is not a middleware
  }
}