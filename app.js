const express = require("express"); // j'invoque express
const morgan = require("morgan"); // Pour arrengistrer toute les operation http dans un fichier journal
const path = require("path"); // le classique pour dealer avec les chemins dacces
const index= require("./routes"); // j'invoque mon fichier route
const errorHandler = require('errorhandler'); // pour gérrer les erreurs en developpement 
require('./database'); // c'est la gestion de ma database

const app = express(); // je stoke express dans app
const port = process.env.PORT || 3000; // le processe de conextion au serveur


app.set("views",path.join(__dirname,"views")); // je declare ou mes vues sont stoker 
app.set('view engine','pug'); // je declare le type de mes vues 

app.use(morgan('short')); // je precise l'option que je veut utiliser avec morgan
app.use(express.static(path.join(__dirname, "public")))// je declare le chemin d'acces de mes fichiers public 
app.use(express.json()); // je declare pour utilisation json type
app.use(express.urlencoded({ extended:true})); //Configure le middleware express.urlencoded() pour être utilisé dans votre application Express. L'option extended indique si l'analyseur doit utiliser la bibliothèque querystring (si false) ou la bibliothèque qs (si true) pour analyser les données encodées.
app.use(index);// ceci corspond au nom de mon fichier route



if (process.env.NODE_ENV === 'development') {// fonction pour diferencier si on est en mode de developpement ou en mode de priduction et comment gerrer les erreurs en fonction
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    const code = err.code || 500;
    res.status(code).json({
      code: code,
      message: code === 500 ? null : err.message
    });
  })
}

app.listen(port);// pour demarer le serveur express