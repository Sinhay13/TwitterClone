// Import the 'passport' module
const passport = require('passport');

// Render the signin form
exports.signinForm = (req, res, next) => {
  // Render the 'auth/auth-form' view with the specified data
  res.render('auth/auth-form', {
    errors: null, // No errors to display
    isAuthenticated: req.isAuthenticated(), // Check if the user is authenticated
    currentUser: req.user // Get the current user
  });
}

// Handle user signin
exports.signin = (req, res, next) => {
  // Authenticate the user using the 'local' strategy
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      next(err); // If there's an error, pass it to the error handler middleware
    } else if (!user) {
      // If authentication fails, render the signin form with an error message
      res.render('auth/auth-form', {
        errors: [info.message], // Display the error message
        isAuthenticated: req.isAuthenticated(), // Check if the user is authenticated
        currentUser: req.user // Get the current user
      });
    } else {
      // If authentication succeeds, log in the user and redirect to '/tweets'
      req.login(user, (err) => {
        if (err) {
          next(err); // If there's an error, pass it to the error handler middleware
        } else {
          res.redirect('/tweets'); // Redirect to the tweets page
        }
      });
    }
  })(req, res, next);
}

// Handle user signout
exports.signout = (req, res, next) => {
  // Log the user out and redirect to the signin form
  req.logout((err) => {
    if (err) {
      return next(err); // If there's an error, pass it to the error handler middleware
    }
    res.redirect('/auth/signin/form'); // Redirect to the signin form
  });
}