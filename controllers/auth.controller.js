// Import the 'passport' module
const passport = require('passport');

// Render the signin form
exports.signinForm = (req, res, next) => {
  // Render the 'auth/auth-form' view with the specified data
  res.render('auth/auth-form', {
    errors: null,
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user
  });
}

// Handle user signin
exports.signin = (req, res, next) => {
  // Authenticate the user using the 'local' strategy
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      next(err);
    } else if (!user) {
      // If authentication fails, render the signin form with an error message
      res.render('auth/auth-form', {
        errors: [info.message],
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user
      });
    } else {
      // If authentication succeeds, log in the user and redirect to '/tweets'
      req.login(user, (err) => {
        if (err) {
          next(err);
        } else {
          res.redirect('/tweets');
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
      return next(err);
    }
    res.redirect('/auth/signin/form');
  });
}
