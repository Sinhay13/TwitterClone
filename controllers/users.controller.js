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

// Middleware to upload user avatar
exports.uploadImage = [
  upload.single('avatar'), // Call the upload function with the 'avatar' field
  async (req, res, next) => { 
    try{
      const user = req.user; // Get the current user
      user.avatar = `/images/avatars/${ req.file.filename} `; // Set the user's avatar to the uploaded file
      await user.save(); // Save the user
      res.redirect('/'); // Redirect to the homepage after successful upload
    }catch(e){
      next(e); // Handle errors
    }
  }
]