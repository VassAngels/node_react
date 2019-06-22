
// //Route handling
// //Routes are receiving requests to certain URLs and are subsequently passing these request to controllers. 
// //This entire 'routes' folder is used as middelware to the application

const express = require('express')
const router = express.Router();

//Accessing controllers
const {signup, signin, signout} = require ('../controllers/auth')
const {userById} = require ('../controllers/user')
const {userSignupValidator} = require ('../validator')


//Posting to DB from frontend
router.post('/signup',userSignupValidator,signup)

router.post('/signin',signin)

router.get('/signout',signout)

// If the 'userId' parameter is present in the url, we run "userId", 
// which fetches the user info based on the id, and append it onto the request object
router.param("userId", userById)


module.exports =router; 

// exports.getPosts = (req,res) => {
//     // res.send("Hello world")
// }

// console.log ("and here")