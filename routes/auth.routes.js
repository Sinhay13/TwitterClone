const router = require('express').Router(); // call of express router 
const { signinForm, signin, signout } = require('../controllers/auth.controller'); // call of controllers

router.get('/signin/form', signinForm); // to fill out the form
router.post('/signin', signin); // to connect
router.get('/signout', signout); // to disconnect 

module.exports = router;