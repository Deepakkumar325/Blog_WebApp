const mongoose = require('mongoose');
const UserDetails = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    }
    ,
    phone:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        require:true,  
    },
    created:{
        type:Date,
        required:true,
        default:Date.now,
    }
})

const User = mongoose.model("User",UserDetails);
 
module.exports = User;