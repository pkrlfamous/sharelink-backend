const mongoose = require('mongoose');

const verificationTokenSchema = new mongoose.Schema({
    token:{
        type:Number,
        require:true,
    },
    email:{
        type:email,
        required:true
    },
    expiresIn:{
        type:Date,
        default: new Date(new Date().getTime() + 600000)
    }
});

const VerificationToken = mongoose.model("VerificationToken", verificationTokenSchema);

module.exports = VerificationToken;