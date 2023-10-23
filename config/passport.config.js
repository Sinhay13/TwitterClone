const { app } = require('../app');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { findUserPerEmail, findUserPerId } = require('../queries/users.queries');

app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // use sessions with passport

// After authentication, we only store the user's _id in the session to avoid overloading it
passport.serializeUser((user, done) => {
  done(null, user._id);
})

// On each request, the session is retrieved by express-session using the session id in the cookie.
// Passport retrieves the user's _id from the session and executes this method.
// We retrieve the user with their _id and return it to Passport with done(null, user).
// Passport will then put it on req.user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserPerId(id);
    done(null, user)
  } catch(e) {
    done(e);
  }
})

// Configuration of the local strategy
// We use the email as the identifier and therefore need to pass the usernameField option
passport.use('local', new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    // We try to retrieve the user with their email
    const user = await findUserPerEmail(email);
    if (user) {
      // If we find the user, we compare the hashed password from the database
      // with the hash of the password provided by the user
      const match = await user.comparePassword(password);
      if (match) {
        // If it matches, then the password is correct
        done(null, user);
      } else {
        // If the hashes do not match, the entered password is incorrect and we return an error
        done(null, false, { message: 'Wrong password' });
      }
    } else {
      // If we don't have a user, we return an error
      done(null, false, { message: 'User not found'});
    }
  } catch(e) {
    done(e);
  }
}))