const router = require('express').Router(); // j'invoque le routeur d'express
const tweets = require('./tweets'); // j'invoque mon fichier tweet du meme repertoire



router.use('/tweets', tweets);// mon fichier router exclusivement pour la partit tweet. 

router.get("/",(req, res) => { // une redirection automatique a l'endpoint "/"
  res.redirect("/tweets");
})


module.exports = router;// j'exporte mon router 



// nos different endpoint 

