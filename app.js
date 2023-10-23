const express = require("express"); // Importing the Express framework
const morgan = require("morgan"); // Importing the Morgan logging middleware
const path = require("path"); // Importing the Path module for working with file paths
const index= require("./routes"); // Importing the routes file
const errorHandler = require('errorhandler'); // Importing the error handling middleware
require('./database'); // Importing the database configuration

const app = express(); // Creating a new Express application
exports.app = app; // Exporting the app for use in other files
const port = process.env.PORT || 3000; // Setting the port for the server to listen on

require('./config/session.config');// Importing the session configuration
require('./config/passport.config'); // Importing the passport configuration

app.set("views",path.join(__dirname,"views")); // Setting the directory where the views are stored
app.set('view engine','pug'); // Setting the view engine to Pug

require('./config/session.config');// Importing the session configuration

app.use(morgan('short')); // Using Morgan to log HTTP requests
app.use(express.static(path.join(__dirname, "public"))); // Serving static files from the public directory
app.use(express.json()); // Parsing JSON data in requests
app.use(express.urlencoded({ extended:true})); // Parsing URL-encoded data in requests
app.use(index); // Using the routes file to handle requests

if (process.env.NODE_ENV === 'development') { // Checking if the app is running in development mode
  app.use(errorHandler()); // Using the error handling middleware in development mode
} else {
  app.use((err, req, res, next) => { // Handling errors in production mode
    const code = err.code || 500;
    res.status(code).json({
      code: code,
      message: code === 500 ? null : err.message
    });
  })
}

app.listen(port); // Starting the server and listening on the specified port