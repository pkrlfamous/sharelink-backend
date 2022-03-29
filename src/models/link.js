const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    linkUrl:{
        type:String,
        required:true,
    },
    parentLinkName:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "",
    },
    childLinkName:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "",
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },


}, {timestamps: true});