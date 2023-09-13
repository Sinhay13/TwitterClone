const router = require('express').Router();// j'invoke les outils pour les router 
const { signup, signupForm } = require('../controllers/users.controller'); // j'invoque mes deux controlers pour cette partie 

router.get('/signup/form', signupForm);// La forme pour sinscrire
router.post('/signup', signup) // l'inscription 

module.exports = router; // on export 