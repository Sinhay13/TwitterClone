// Import the 'createUser' function from the 'users.queries' module
const { createUser } = require('../queries/users.queries');

// Render the signup form
exports.signupForm = (req, res, next) => {
  // Render the 'users/user-form' view with the specified data
  res.render('users/user-form', {
    errors: null,
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user
  });
}

// Handle user signup
exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    // Create a new user using the 'createUser' function
    const user = await createUser(body);
    // Redirect to the homepage after successful signup
    res.redirect('/');
  } catch (e) {
    // If there's an error during signup, render the signup form with an error message
    res.render('users/user-form', {
      errors: [e.message],
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user
    });
  }
}
