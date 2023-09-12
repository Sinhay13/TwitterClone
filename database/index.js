const mongoose = require('mongoose'); // j'invoque mongoose
const config = require('./config'); // j'invoque l'acces a ma database 

mongoose.connect(config.mongoURI) // Et je connect
    .then(() => console.log('db ok !')) // Ok
    .catch(err => console.log(err)); // pas ok 


                // Pour me connecter a database identifiants d'accer a la database verouiller sur un fichier en local 