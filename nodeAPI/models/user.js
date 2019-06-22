const mongoose = require("mongoose");
const uuidv1 =require('uuid/v1');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }, 
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
})

// Virtual fields are additional fields for a given mode. 
// Their values can be set manually or automatically with defined functionality.
// Keep in mind: virtual properties (like password) dont get persisted in the database. 
// They only exist logically and are not written to the document's collection


//virtual field
userSchema.virtual('password')
.set(function(password){
    //create temporary variable called _password
    this._password = password
    //generate a timestamp
    this.salt = uuidv1()
    //encryptPassword()
    this.hashed_password=this.encryptPassword(password)
})
.get(function(){
    return this._password
})

//methods
userSchema.methods = {
    authenticate: function (plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password){
        if(!password) return "";
        try {
                return crypto.createHmac('sha256', this.salt)
                .update(password)
                .digest('hex');
        } catch(err){
            return "";
        }
    }
};


module.exports = mongoose.model("User", userSchema);