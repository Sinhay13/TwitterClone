const passport = require('passport'); // we call passport for the authentication 

exports.signinForm = (req, res, next) => { // acces to the form for the connection 
  res.render('auth/auth-form', { errors: null }); 
}

exports.signin = (req, res, next) => { // to connect
  passport.authenticate('local', (err, user, info) => { // call passport in local 
    if (err) {
      next(err);// errors for middleware 
    } else if (!user) { // if not good user 
      res.render('auth/auth-form', { errors: [ info.message ] }); // show error message 
    } else {
      req.login(user, (err) => { // succeed redirect to home page
        if (err) { next(err) } else {
          res.redirect('/tweets');
        }
      })
    }
  })(req, res, next);
}

exports.signout = (req, res, next) => { // log out and redirect to sign in 
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/auth/signin/form'); 
  });
}