const mongoose = require("mongoose"); // j'invoque ma base donnée
const schema = mongoose.Schema; // et son schemas

// Define the Mongoose schema for tweets
const tweetSchema = schema({
        // Define the content field for tweets
        content: {
          type: String,
          maxlength: [140, 'Tweet is too long'],
          minlength: [1, 'Tweet is too short'],
          required: [true, 'Field is required']
        },
        // Define the author field as a reference to the 'user' collection
        author: {
          type: schema.Types.ObjectId,
          ref: 'user',
          required: true
        }
      });
      

const Tweet = mongoose.model('tweet', tweetSchema); // je stoke le tout dans ma constante Tweet

module.exports = Tweet; // j'exporte la constante 

// Le serializer de notre tweet.