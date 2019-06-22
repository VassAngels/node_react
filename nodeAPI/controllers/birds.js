
// Use the express.Router class to create modular, mountable 
// ROUTE HANDLERS. 
// A Router instance is a complete middleware and routing system; 
// for this reason, it is often referred to as a “mini-app”.
// The following example creates a router as a module, 
// loads a middleware function in it, 
// defines some routes, and mounts the router module on a 
// path in the main app.

const express = require('express')
const router = express.Router()

//middleware that is specific to this router
router.use(function timeLog (req,res,next) {
    console.log('TIme: ', Date.now())
    next()
})

//define the homepage route
router.get('/', function(req,res){
    res.send('Birds Home Page')
})

router.get('/about', function(req,res){
    res.send('About birds')
})

module.exports = router
