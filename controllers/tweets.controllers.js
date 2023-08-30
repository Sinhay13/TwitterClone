const { getTweets, createTweet, deleteTweet, getTweet, updateTweet  } = require('../queries/tweets.queries'); //l'appel de mes functions depuis ma queries

exports.tweetList = async (req, res, next) => {
  try {
    const tweets = await getTweets(); // j'appelle ma fonction getTweets
    res.render('tweets/tweet', { tweets }); // jenvoit le resultat 
  } catch(e) { // je gére avec mon erreur
    next(e);
  }
}

exports.tweetNew = (req, res, next) => { // cette fonction a pour but d'appeler seulement la form pour créer un tweet
  res.render('tweets/tweet-form',{tweet:{}});
}

exports.tweetCreate = async (req, res, next) => {
  try {
    const body = req.body;// je stoke le body de mon tweet
    await createTweet(body); // j'appelle et j'execute ma fonction de creation de tweet
    res.redirect('/tweets'); // je renvois a la page des tweets
  } catch(e) { // je deal avec mes erreurs
    const errors = Object.keys(e.errors).map( key => e.errors[key].message );
    res.status(400).render('tweets/tweet-form', { errors });
  }
}

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
}

 exports.tweetEdit= async(req, res, next) => { // fonction pour édité
    try{
      const tweetId=req.params.tweetId;// on recupére l'ID du tweet
      const tweet=  getTweet(tweetId);// on recupere le tweet en question avec une fonction propre
      res.render('tweets/tweet-form',{tweet}); // et on retourne sur notre page form avec notre tweet pre charger
    }catch(e){
      next(e);
    }
 
 }
 
 exports.tweetUpdate = async(req, res, next)=> {
  try{
    const body =req.body; // pour stoker le body de mon tweet 
    await updateTweet(tweetId, body); // j'apelle ma fonction avec les bon parametre pour update mon tweet
    res.redirect('/tweets');// je retourne sur mes tweets
  }catch(e){
    const errors = Object.keys(e.errors).map( key => e.errors[key].message );
    res.status(400).render('tweets/tweet-form', { errors }); // on gére comme dans la creation de tweet 
  }
 }

// c'est partie contien les functions pour gérer les requetes http de mon app  