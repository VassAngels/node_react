
// //Route handling
// //Routes are receiving requests to certain URLs and are subsequently passing these request to controllers. 
// //This entire 'routes' folder is used as middelware to the application
const express = require('express')
const router = express.Router();

//Accessing controllers
const {userById, allUsers, getUser,updateUser,deleteUser} = require ('../controllers/user')
const {requireSignin} = require('../controllers/auth')
//Routes handled
router.get('/users',allUsers)
router.get('/user/:userId', getUser)
router.put('/user/:userId', requireSignin, updateUser)
router.delete('/user/:userId', requireSignin, deleteUser)

// If the 'userId' parameter is present in the url, we run "userById", 
// which fetches the user info based on the id, and append it onto the request object
router.param("userId", userById)


module.exports =router; 
