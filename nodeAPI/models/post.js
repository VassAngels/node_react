const mongoose =require('mongoose')
const {ObjectId} = mongoose.Schema

//This is our post model
const postSchema = new mongoose.Schema({
    title:{
        type: String
    },
    body: {
        type:String
    },
    photo: {
        type: Buffer, 
        contentType: String
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created:{
        type: Date,
        default: Date.now
    }
});

// //export this model, so we can require it in the controller to create a new post that uses this model
// //model method creates the model, takes two arguments: name and schema
module.exports = mongoose.model("Post", postSchema)