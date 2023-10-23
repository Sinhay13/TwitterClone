const { getTweets, createTweet, deleteTweet, getTweet, updateTweet  } = require('../queries/tweets.queries'); // Importing the tweet queries

// Controller function to display the list of tweets
exports.tweetList = async (req, res, next) => {
  try {
    const tweets = await getTweets(); // Call the getTweets function to retrieve all tweets
    res.render('tweets/tweet', { tweets, isAuthenticated: req.isAuthenticated(), currentUser: req.user }); // Render the tweet view with the retrieved tweets
  } catch(e) {
    next(e); // Handle errors
  }
};

// Controller function to display the tweet creation form
exports.tweetNew = (req, res, next) => {
  res.render('tweets/tweet-form',{tweet:{},isAuthenticated: req.isAuthenticated(), currentUser: req.user }); // Render the tweet form view
}

// Controller function to create a new tweet
exports.tweetCreate = async (req, res, next) => {
  try {
    const body = req.body; // Get the request body
    await createTweet({ ...body, author: req.user._id }); // Create a new tweet with the author's user ID
    res.redirect('/tweets'); // Redirect to the tweets page after successful tweet creation
  } catch (e) {
    const errors = Object.keys(e.errors).map(key => e.errors[key].message); // Handle errors by extracting error messages
    res.status(400).render('tweets/tweet-form', { errors, isAuthenticated: req.isAuthenticated(), currentUser: req.user }); // Render the tweet form view with error messages
  }
};

// Controller function to delete a tweet
exports.tweetDelete = async(req, res, next) => {
  try {
    const tweetId= req.params.tweetId; // Get the tweet ID from the request parameters
    await deleteTweet(tweetId); // Call the deleteTweet function with the tweet ID to delete the tweet
    const tweets=await getTweets(); // Retrieve all tweets
    res.render('tweets/tweet-list', { tweets }); // Render the tweet list view
  }catch(e){
    next(e); // Handle errors
  }
};

// Controller function to display the tweet edition form
exports.tweetEdit= async(req, res, next) => {
  try{
    const tweetId=req.params.tweetId; // Get the tweet ID from the request parameters
    const tweet= await getTweet(tweetId); // Call the getTweet function with the tweet ID to retrieve the tweet
    res.render('tweets/tweet-form',{ tweet, isAuthenticated: req.isAuthenticated(), currentUser: req.user }); // Render the tweet form view with the retrieved tweet
  }catch(e){
    next(e); // Handle errors
  };
}

// Controller function to update a tweet
exports.tweetUpdate = async (req, res, next) => {
  const tweetId = req.params.tweetId; // Get the tweet ID from the request parameters
  try {
    const body = req.body; // Get the request body
    await updateTweet(tweetId, body); // Call the updateTweet function with the tweet ID and the request body to update the tweet
    res.redirect('/tweets'); // Redirect to the tweets page after successful tweet update
  } catch(e) {
    const errors = Object.keys(e.errors).map( key => e.errors[key].message ); // Handle errors by extracting error messages
    const tweet = await getTweet(tweetId); // Retrieve the tweet
    res.status(400).render('tweets/tweet-form', { errors, tweet, isAuthenticated: req.isAuthenticated(), currentUser: req.user }); // Render the tweet form view with error messages
  }
};