const { getTweets, createTweet, deleteTweet, getTweet, updateTweet  } = require('../queries/tweets.queries'); //l'appel de mes functions depuis ma queries

exports.tweetList = async (req, res, next) => {
  try {
    const tweets = await getTweets(); // j'appelle ma fonction getTweets
    res.render('tweets/tweet', { tweets, isAuthenticated: req.isAuthenticated(), currentUser: req.user }); // Send list in function of the current user authenticated 
  } catch(e) { // je gére avec mon erreur
    next(e);
  }
};

exports.tweetNew = (req, res, next) => { // cette fonction a pour but d'appeler seulement la form pour créer un tweet
  res.render('tweets/tweet-form',{tweet:{},isAuthenticated: req.isAuthenticated(), currentUser: req.user }); // call for is isAuthenticated
}

// Controller function to create a new tweet
exports.tweetCreate = async (req, res, next) => {
  try {
    // Get the request body
    const body = req.body;
    
    // Create a new tweet with the author's user ID
    await createTweet({ ...body, author: req.user._id });

    // Redirect to the tweets page after successful tweet creation
    res.redirect('/tweets');
  } catch (e) {
    // Handle errors by extracting error messages
    const errors = Object.keys(e.errors).map(key => e.errors[key].message);
    
    // Render the tweet creation form with error messages
    res.status(400).render('tweets/tweet-form', { errors, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
  }
};


exports.tweetDelete = async(req, res, next) => {
  try {
    const tweetId= req.params.tweetId;// je recupere l'id de mon tweet
    await deleteTweet(tweetId); // j'invoke ma fonction de supression de tweet avec le bon Id
    const tweets=await getTweets(); // je recupere ma list de tweet 
    res.render('tweets/tweet-list', { tweets }); // je retourne sur ma liste de tweet
    //res.end();// je termine le process
  }catch(e){ // je deal avec mon erreur
    next(e);
  }
};

 exports.tweetEdit= async(req, res, next) => { // fonction pour édité
    try{
      const tweetId=req.params.tweetId;// on recupére l'ID du tweet
      const tweet= await getTweet(tweetId);// on recupere le tweet en question avec une fonction propre
      res.render('tweets/tweet-form',{ tweet, isAuthenticated: req.isAuthenticated(), currentUser: req.user }); // render tweet form + authenticated
    }catch(e){
      next(e);
    };
 
 }
 
 exports.tweetUpdate = async (req, res, next) => {
  const tweetId = req.params.tweetId; // je recupere l'id du tweet a update
  try {
    const body = req.body; // je stoke lle body dans une cst
    await updateTweet(tweetId, body); // je ma function d'update
    res.redirect('/tweets'); // je redirige ver la page des tweets
  } catch(e) { // je deal avec mon erreur 
    const errors = Object.keys(e.errors).map( key => e.errors[key].message );
    const tweet = await getTweet(tweetId);
    res.status(400).render('tweets/tweet-form', { errors, tweet, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
  }
};
// c'est partie contien les functions pour gérer les requetes http de mon app  