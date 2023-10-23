const mongoose = require('mongoose'); // Import the mongoose library
const config = require('./config'); // Import the configuration file (assuming it contains mongoURI)

// Connect to the MongoDB database using mongoose and export the clientPromise for use in other parts of the application
exports.clientPromise = mongoose
  .connect(
    config.mongoURI // Use the mongoURI from the configuration file to connect to the MongoDB database
  )
  .catch((err) => console.log(err)); // Handle errors if any occur during the connection process