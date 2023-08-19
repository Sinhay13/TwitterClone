const Tweet = require('../database/models/tweet.model'); // j'invoke mon tweet model depuis mon model

exports.getTweets = () => { // cette fonction a pour but recuperer tout les tweets present
  return Tweet.find({}).exec();
}

exports.createTweet = (tweet) => { // cette fonction a pour but de créer un tweet
  const newTweet = new Tweet(tweet); // crée une nouvelle instance du modèle "Tweet" avec les données du tweet fourni.
  return newTweet.save(); // je sauve mon tweet
}


// Mais function logique que j'utilise dans mon controler sont repertorier ici. 