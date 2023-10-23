const router = require('express').Router(); // Importing the Express router
const { signup, signupForm, uploadImage } = require('../controllers/users.controller'); // Importing the user controllers
const { ensureAuthenticated } = require('../config/guards.config'); // Importing the ensureAuthenticated function from the guards.config file

router.get('/signup/form', signupForm); // Handling GET requests to the /signup/form endpoint to display a form for signing up
router.post('/signup', signup); // Handling POST requests to the /signup endpoint to create a new user
router.post('/update/image', ensureAuthenticated, uploadImage); // Handling POST requests to the /update/image endpoint to upload a user's profile image, with ensureAuthenticated middleware

module.exports = router; // Exporting the router to be used in other files