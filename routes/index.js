const router = require('express').Router(); // Importing the Express router
const { ensureAuthenticated } = require('../config/guards.config'); // Importing the ensureAuthenticated function from the guards.config file

const tweets = require('./tweets.routes'); // Importing the tweets routes file
const users = require('./users.routes'); // Importing the users routes file
const auth = require('./auth.routes'); // Importing the authentication routes file

router.use('/tweets',ensureAuthenticated , tweets); // Using the router to handle requests to the /tweets endpoint, with ensureAuthenticated middleware and the tweets routes
router.use('/users', users); // Using the router to handle requests to the /users endpoint, with the users routes
router.use('/auth', auth); // Using the router to handle requests to the /auth endpoint, with the authentication routes

router.get("/",(req, res) => { // Handling GET requests to the root endpoint
  res.redirect("/tweets"); // Redirecting to the /tweets endpoint
})

module.exports = router; // Exporting the router to be used in other files