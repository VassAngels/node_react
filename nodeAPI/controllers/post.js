const _ = require ('lodash')
const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs') //core noide module


//Middleware methods
//
exports.postById = (req, res, next,id)=>{
    Post.findById(id) //find post based on the passed post id
    .populate("postedBy", "_id name")
    .exec((err,post)=>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        if(!post){
            return res.status(400).json({
                error: "The post id doesn't exist"
            })
        }
        req.post = post //attaching post to the request 
        next()
    })
};

exports.isPoster = (req,res,next)=>{
    const isPoster = req.post && req.auth && req.post.postedBy._id==req.auth._id
    if (!isPoster){
        return res.status(403).json({
            error: "User is not authorised"
        })
    }
    next() 
};

//Request Methods
//
//Creating a new post based on the information sent to us via the 'req'. To be stored in the DB. 
exports.createPost = (req,res) => {
    
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=>{
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        let post = new Post(fields)
        
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile
        if(files.photo){
            post.photo.data=fs.readFileSync(files.photo.path)
            post.photo.contentType=files.photo.type
        }
        post.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error: err
                })
            }
            res.json(result)
        })
    })
};

exports.getPosts = (req, res) => {
    const posts = Post.find()
    .populate("postedBy", "_id name")
    .select("_id title body")
    .then((posts)=> {
        res.json({posts: posts})
    })
    .catch(err => console.log(err));
};

exports.postsByUser = (req, res) => {
    Post.find({ postedBy: req.profile._id })
        .populate("postedBy", "_id name")
        .sort("_created")
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({posts: posts});
        });
};

exports.updatePost = (req, res, next) => {
    let post = req.post;
    post = _.extend(post,req.body);
    post.updated = Date.now()
    post.save(err =>{
        if (err){
            return res.status(400).json({
                error: err
            })
        }
        res.json(post)
    })
};

exports.deletePost = (req,res)=>{
    const post =req.post
    post.remove((err,post)=>{
        if (err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({message: "Post deleted succesfully"})
    })
};