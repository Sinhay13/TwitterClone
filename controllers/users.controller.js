const { createUser } = require('../queries/users.queries'); // Importing the createUser function from the users.queries module
const path = require('path'); // Importing the path module
const multer = require('multer'); // Importing the multer module for handling file uploads
const upload = multer({ storage: multer.diskStorage({ // Creating a multer instance with disk storage options
  destination: (req, file, cb) => { // Setting the destination directory for uploaded files
    cb(null, path.join( __dirname, '../public/images/avatars'))
  },
  filename: (req, file, cb) => { // Setting the filename for uploaded files
    cb(null, `${ Date.now() }-${ file.originalname }`);
  }
}) })

exports.signupForm = (req, res, next) => { // Exporting a function for rendering the user signup form
  res.render('users/user-form', { errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
}

exports.signup = async (req, res, next) => { // Exporting an async function for handling user signup
  const body = req.body; // Extracting the request body
  try {
    const user = await createUser(body); // Creating a new user with the createUser function
    res.redirect('/'); // Redirecting to the home page
  } catch(e) {
    res.render('users/user-form', { errors: [ e.message ], isAuthenticated: req.isAuthenticated(), currentUser: req.user }); // Rendering the user signup form with an error message if there was an error creating the user
  }
}

exports.uploadImage = [ // Exporting an array of middleware functions for handling user avatar uploads
  upload.single('avatar'), // Using multer to handle the file upload
  async (req, res, next) => { // Async function for updating the user's avatar
    try {
      const user = req.user; // Getting the current user from the request object
      user.avatar = `/images/avatars/${ req.file.filename }`; // Setting the user's avatar path to the uploaded file
      await user.save(); // Saving the user to the database
      res.redirect('/'); // Redirecting to the home page
    } catch(e) {
      next(e); // Passing any errors to the error handling middleware
    }
  }
]