const express = require('express'); // Importing the Express framework
const router = express.Router(); // Creating a new router instance
const { tweetList, tweetNew, tweetCreate, tweetDelete, tweetEdit, tweetUpdate } = require('../controllers/tweets.controllers.js'); // Importing the tweet controllers

router.get('/', tweetList); // Handling GET requests to the root endpoint to display a list of tweets
router.get('/new', tweetNew); // Handling GET requests to the /new endpoint to display a form for creating a new tweet
router.post('/', tweetCreate); // Handling POST requests to the root endpoint to create a new tweet
router.delete("/:tweetId", tweetDelete); // Handling DELETE requests to the /:tweetId endpoint to delete a tweet with the specified ID
router.get("/edit/:tweetId", tweetEdit) // Handling GET requests to the /edit/:tweetId endpoint to display a form for editing a tweet with the specified ID
router.post("/update/:tweetId", tweetUpdate) // Handling POST requests to the /update/:tweetId endpoint to update a tweet with the specified ID

module.exports = router; // Exporting the router to be used in other files