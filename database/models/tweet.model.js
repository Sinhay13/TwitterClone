const mongoose = require("mongoose"); // j'invoque ma base donnée
const schema = mongoose.Schema; // et son schemas

const tweetSchema= schema({ // ceci et le shemas de mes regles d'utilisation des tweets 
        content: {type : String,
        maxlength: [140, "Too long"], 
        minlength: [1, "Too short"], 
        required : [true,"Fill up"],
        }
});

const Tweet = mongoose.model('tweet', tweetSchema); // je stoke le tout dans ma constante Tweet

module.exports = Tweet; // j'exporte la constante 

// Le serializer de notre tweet 