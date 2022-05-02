const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlenght: 255
    },
    email:{
        type:String,
        required: true,
        lowercase: true,
        unique: true,
        maxlenght: 255,
        trim: true
    },
    password:{
        type: String,
        required: true,
        maxlength: 255,
        trim: true
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    emailVerified:{
        type: Boolean,
        default:false
    },
    permissions:[
        {
            type: String
        }
    ]  
}, {timestamps:true});

const User = mongoose.model("User", userSchema);
module.exports = User;