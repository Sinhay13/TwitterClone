const express = require('express');
const router = express.Router();
const {tweetList, tweetNew, tweetCreate}=require('../controllers/tweets.controllers.js');
const Tweet= require("../database/models/tweet.model");

router.get('/', tweetList); 
router.get('/tweet/new', tweetNew);
router.post('/', tweetCreate);
  
module.exports = router;
// l'api de mon tweet

