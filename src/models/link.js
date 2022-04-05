const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    url:{
        type:String,
        required:true,
    },
    parentLink:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "",
    },
    childLink:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "",
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    description:{
        type: String,

    },
    tag:{
        type:Array
    }
}, {timestamps: true});

const Link = mongoose.model("Link", linkSchema);
module.exports = Link;