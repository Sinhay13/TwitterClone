const express = require('express'); // j'invoque express
const router = express.Router(); // j'invoque le router d'express
const {tweetList, tweetNew, tweetCreate,tweetDelete, tweetEdit, tweetUpdate }=require('../controllers/tweets.controllers.js'); // j'invoque mes controllers


router.get('/', tweetList); // pour acceder a list de tweet
router.get('/new', tweetNew); // pour acceder aux nouveaux tweet
router.post('/', tweetCreate); // pour créer un tweet
router.delete("/:tweetId", tweetDelete); // pour suprimer un tweet
router.get("/edit/:tweetId", tweetEdit) // pour editer un tweet, tweetID car on recuperer un tweet faut savoir lequelle 
router.post("/update/:tweetId",tweetUpdate) // pour metre a jour le tweet apres l'avoir édité 

  
module.exports = router; // j'export mon router 
// l'api de mon tweet

    