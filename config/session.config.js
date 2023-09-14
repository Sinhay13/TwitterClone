const { app } = require('../app'); // on recupere notre fichier app a la racine du projet 
const session = require('express-session'); // on invoque le midleware de expresse pour gérer les sessions
const MongoStore= require('connect-mongo'); // On invoque mongostore avec session, storage session for expresse
const {clientPromise}= require('../database'); // acces to the database 



app.use(session({//we ask express to use session to deal with user session
    secret: 'Comicsvampires13', // for the Id cookie
    resave: false, // false like that we do not write for each session if nothing was changed
    saveUninitialized: false, // same no new save if nothing change 
    cookie: { // configure cooki 
      httpOnly: false, // block acces to the content of javascript front
      maxAge: 1000 * 60 * 60 * 24 * 14 // max age in milisecond
    },
    store: MongoStore.create({// for creatin a new onstance 
      clientPromise: clientPromise.then((m) => m.connection.getClient()),// to get the promise
      ttl: 60 * 60 * 24 * 14,// time of session in seconde
    }),
  }));

