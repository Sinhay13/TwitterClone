const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongoURI)
    .then(() => console.log('db ok !'))
    .catch(err => console.log(err));


                // Pour me connecter a database identifiants d'accer a la database verouiller sur un fichier en loca