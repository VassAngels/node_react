const jwt=require ('jsonwebtoken')
require('dotenv').config()
const expressJwt = require("express-jwt");
const User = require('../models/user')

//Signup
exports.signup = async(req,res) => {
    const userExists = await User.findOne({email: req.body.email})
    if(userExists) return res.status(403).json({
        error: "Email is taken"
    })
    const user = await new  User(req.body)
    await user.save()
    res.status(200).json({message: "A user has been created, you can sing in" })
}

//Signin
exports.signin = (req, res)=>{
    //find the user based on email, see if they exist in the db
    const {email,password} =req.body;
    User.findOne({email}, (err,user)=>{
        //if error or no user
        if(err || !user) {
            return res.status(401).json({
                error: "User with that email does not exist."
            });
        }
        //if user is found make sure that email and password match
        //have created an authenticate method in User model and use here
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match."
            });
        }
    //generate a token with userId and secret from the  env file
    const token = jwt.sign(
        {_id: user._id}, process.env.JWT_SECRET);
    //persist the token as 't' in cookie with expiry date 
    res.cookie("t", token, {expire: new Date()+9999})
    //return response with user and token to frontend client 
    const {_id, name, email} = user
    return res.json({token, user: {_id, email,name}});
    });

};


//Signout
//we only need to clear the cookie
exports.signout = (req,res) => {
    res.clearCookie("t")
    return res.json({message: "Signed out!"})
}


//
exports.requireSignin = expressJwt(
    {
        //if the token is valid, express jwt appends the verified user's id
        //in an auth key to the request object
        secret: process.env.JWT_SECRET,
        userProperty: "auth"
    }
    
);

