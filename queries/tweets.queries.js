const Tweet = require('../database/models/tweet.model'); // Importing the tweet model

exports.getTweets = () => { // Function to get all tweets
  return Tweet.find({}).exec();
}

exports.createTweet = (tweet) => { // Function to create a new tweet
  const newTweet = new Tweet(tweet); // Creating a new instance of the "Tweet" model with the provided tweet data
  return newTweet.save(); // Saving the new tweet
}

exports.deleteTweet=(tweetId) => { // Function to delete a tweet
  return Tweet.findByIdAndDelete(tweetId).exec(); // Using the findByIdAndDelete method to delete the tweet
}

exports.getTweet=(tweetId) => { // Function to get a specific tweet by its ID
  return Tweet.findOne({ _id: tweetId }).exec();
}

exports.updateTweet = (tweetId,tweet) => { // Function to update a tweet
  return Tweet.findByIdAndUpdate(tweetId, {$set: tweet }, {runValidators: true}); // Using the findByIdAndUpdate method to update the tweet, with validators enabled
}
 