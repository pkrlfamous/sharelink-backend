const {User, VerificationToken} = require('../models');
const catchAsync = require('../utils/catchAsync');
const _ = require('lodash');
const bcrypt = require('bcrypt');

module.exports = {
    registerUser: catchAsync(async(req, res, next)=>{
        let user = await User.findOne({email: req.body.email});
        if(user) return res.status(400).send('User already registered');
        user = new User(_.pick(req.body, ['name', 'email', 'password', 'role']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        return res.send(user);
    },),

    loginUser: catchAsync(async(req, res, next)=>{
        let user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Invalid email.');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send('Invalid password');
        console.log('successfully logged in')
        return res.status(200).send()
    }),
    
    
}