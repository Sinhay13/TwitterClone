const mongoose = require("mongoose"); // Importing the mongoose module to interact with the MongoDB database
const schema = mongoose.Schema; // Creating a new schema object from the mongoose module

// Define the Mongoose schema for tweets
const tweetSchema = schema({
  // Define the content field for tweets
  content: {
    type: String,
    maxlength: [140, 'Tweet is too long'], // Maximum length of 140 characters for the tweet content
    minlength: [1, 'Tweet is too short'], // Minimum length of 1 character for the tweet content
    required: [true, 'Field is required'] // The tweet content is required
  },
  // Define the author field as a reference to the 'user' collection
  author: {
    type: schema.Types.ObjectId, // The author field is an ObjectId
    ref: 'user', // The author field is a reference to the 'user' collection
    required: true // The author field is required
  }
});

const Tweet = mongoose.model('tweet', tweetSchema); // Creating a new model 'Tweet' from the tweetSchema

module.exports = Tweet; // Exporting the 'Tweet' model