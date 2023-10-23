const { app } = require('../app'); // Importing the app file from the root of the project
const session = require('express-session'); // Importing the express-session middleware to manage sessions
const MongoStore= require('connect-mongo'); // Importing MongoStore with session to store sessions for express
const {clientPromise}= require('../database'); // Importing the clientPromise from the database file to access the database

app.use(session({ // Using the session middleware to manage user sessions
    secret: 'Comicsvampires13', // Secret key for the session ID cookie
    resave: false, // Don't save the session if nothing was changed
    saveUninitialized: false, // Don't save a new session if nothing was changed
    cookie: { // Configuring the cookie
      httpOnly: false, // Blocking access to the content of the cookie from front-end JavaScript
      maxAge: 1000 * 60 * 60 * 24 * 14 // Maximum age of the cookie in milliseconds (here, 14 days)
    },
    store: MongoStore.create({ // Creating a new instance of MongoStore to store sessions
      clientPromise: clientPromise.then((m) => m.connection.getClient()), // Getting the promise from clientPromise
      ttl: 60 * 60 * 24 * 14, // Time-to-live of the session in seconds (here, 14 days)
    }),
  }));
