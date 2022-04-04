const {User, VerificationToken} = require('../models');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { response } = require('express');

module.exports = {
    registerUser: async(req, res, next)=>{
        // let user = await User.findOne({email: req.body.email});
        // if(user) return res.status(400).send('User already registered');
        console.log('req.bo', req.body);
        let user = new User(_.pick(req.body, ['name', 'email', 'password', 'role']));
        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        console.log('user password',user.password, user.name);
        console.log('user',user);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        return res.send(user);
    }
}