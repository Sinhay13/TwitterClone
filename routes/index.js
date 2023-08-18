const router = require('express').Router();
const tweets = require('./tweets');
const Tweet= require("../database/models/tweet.model");


router.use('/tweets', tweets);

router.get("/",(req, res) => {
  res.redirect("/tweets");
})


module.exports = router;



// nos different endpoint 

