
// //Route handling
// //Routes are receiving requests to certain URLs and are subsequently passing these request to controllers. 
// //This entire 'routes' folder is used as middelware to the application

const express = require('express')
const router = express.Router();

//Accessing controllers
const {getPosts,createPost,postsByUser,postById,isPoster,deletePost,updatePost} = require ('../controllers/post')
const {requireSignin} = require("../controllers/auth")
const {userById} = require ('../controllers/user')
const {createPostValidator} = require ('../validator')
// const consolelog = console.log("Made it to here");

// //Here the Router handles a get request to '/' by passing it to the Controller
router.get('/posts',getPosts)

//Request Methods
//Posting to DB from frontend
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator)
//Posts by id
router.get('/posts/by/:userId', requireSignin, postsByUser)
//Delete post
router.delete('/post/:postId', requireSignin, isPoster, deletePost)
//Update post
router.put('/post/:postId', requireSignin, isPoster,updatePost)


//Parameters
// any route containing :userId, our app will first execute userByID()
router.param("userId", userById)

// any route containing :postId, our app will first execute postByID()
router.param("postId", postById)


module.exports =router; 

// exports.getPosts = (req,res) => {
//     // res.send("Hello world")
// }

// console.log ("and here")