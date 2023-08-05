const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yahnis:Vampires13@cluster0.die46s3.mongodb.net/tweeter?retryWrites=true')
                .then( () => console.log('db ok !'))
                .catch(err => console.log(err));

                // Pour initier notre database