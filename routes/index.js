const router = require('express').Router(); // j'invoque le routeur d'express
const tweets = require('./tweets.routes'); // j'invoque mon fichier tweet du meme repertoire
const users = require('./users.routes'); // j'invoque le fichier pour les routes users 
const auth = require('./auth.routes'); // for authentication


router.use('/tweets', tweets);// mon fichier router exclusivement pour la partit tweet. 
router.use('/users', users); // la meme pour la partie user. 
router.use('/auth', auth); // for authentication

router.get("/",(req, res) => { // une redirection automatique a l'endpoint "/"
  res.redirect("/tweets");
})


module.exports = router;// j'exporte mon router 



// nos different endpoint 

