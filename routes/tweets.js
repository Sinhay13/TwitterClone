const express = require('express'); // j'invoque express
const router = express.Router(); // j'invoque le router d'express
const {tweetList, tweetNew, tweetCreate,tweetDelete }=require('../controllers/tweets.controllers.js'); // j'invoque mes controllers


router.get('/', tweetList); // pour acceder a list de tweet
router.get('/tweet/new', tweetNew); // pour acceder aux nouveaux tweet
router.post('/', tweetCreate); // pour créer un tweet
router.delete("/:tweetId", tweetDelete); // pour suprimer un tweet
  
module.exports = router; // j'export mon router 
// l'api de mon tweet

