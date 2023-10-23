// to protect some resources 
// middleware to force the user to be connected, Authenticated from passport module 
exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { // check if the user is authenticated
      next() // if yes, continue to the next middleware
    } else {
      res.redirect('/auth/signin/form'); // if not, redirect to the sign-in form
    }
  }