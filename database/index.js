const mongoose = require('mongoose'); // Import mongoose library
const config = require('./config'); // Import your configuration (assuming it contains mongoURI)

// Connect to the MongoDB database using mongoose + Export the clientPromise for use in other parts of your application
exports.clientPromise = mongoose
  .connect(
    config.mongoURI
  )
  .catch((err) => console.log(err));      









