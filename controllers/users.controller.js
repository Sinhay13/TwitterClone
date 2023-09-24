// Import the 'createUser' function from the 'users.queries' module
const { createUser } = require('../queries/users.queries');
const path = require('path')// to deal with image address
const multer = require('multer');// to call multer
const upload= multer({ storage: multer.diskStorage({ // to handle images
  destination: (req, file, cb) => {
    cb(null, path.join( __dirname, '../public/images/avatars'))// localization 
  },
  filename: (req, file, cb)=>{
    cb(null, `${ Date.now() }-${ file.originalname }` );// to give a name 
  }
})});


// Render the signup form
exports.signupForm = (req, res, next) => { 
  // Render the 'users/user-form' view with the specified data
  res.render('users/user-form', {
    errors: null,
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user
  });
}

// Handle user signup
exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    // Create a new user using the 'createUser' function
    const user = await createUser(body);
    // Redirect to the homepage after successful signup
    res.redirect('/');
  } catch (e) {
    // If there's an error during signup, render the signup form with an error message
    res.render('users/user-form', {
      errors: [e.message],
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user
    });
  }
}
// to upload image 
exports.uploadImage = [
  upload.single('avatar'),// call of the upload function 
  async (req, res,next) => { 
    try{
      const user = req.user; // call user
      user.avatar = `/images/avatars/${ req.file.filename} `; // receive file
      await user.save(); // save files
      res.redirect('/'); // redirect on the first page 
    }catch(e){
      next(e);
    }
  }
]
 