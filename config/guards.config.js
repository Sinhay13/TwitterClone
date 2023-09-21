// to protect somme resources 

exports.ensureAuthenticated = (req, res, next) => { // middleware to force the user to be connected, sAuthenticated from passport module 
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/auth/signin/form');
    }
  }