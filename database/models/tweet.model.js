const mongoose = require("mongoose");
const schema = mongoose.Schema;

const tweetSchema= schema({
        content: {type : String,
        maxlength: [140, "Too long"], 
        minlength: [1, "Too short"], 
        required : [true,"Fill up"],
        }
});

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;

// Le serializer de notre tweet 