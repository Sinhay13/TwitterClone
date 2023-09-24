const router = require('express').Router();// j'invoke les outils pour les router 
const { signup, signupForm, uploadImage } = require('../controllers/users.controller'); // j'invoque mes deux controlers pour cette partie 
const { ensureAuthenticated}=require('../config/guards.config'); // call guards to be sur the user is log in 

router.get('/signup/form', signupForm);// La forme pour sinscrire
router.post('/signup', signup); // l'inscription
router.post('/update/image', ensureAuthenticated, uploadImage); // to upload image 

module.exports = router; // on export 