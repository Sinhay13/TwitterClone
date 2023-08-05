const express = require('express');
const router = express.Router();

const Tweet= require("../database/models/tweet.model");

router.post('/', (req, res) => {
    const body = req.body;
    const newTweet = new Tweet(body);
    newTweet.save()
            .then( newTweet => res.redirect('/'))
            .catch( err =>{
                const errors = Object.keys(err.errors).map(key => err.errors[key].message);
                res.status(400).render('tweets/tweet-form', {errors});
            
            })
    
});

module.exports = router;

// l'api de mon tweet

