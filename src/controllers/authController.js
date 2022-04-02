const {User, VerificationToken} = require('../models');
const _ = require('lodash');

module.exports = {
    registerUser: async(req, res, next)=>{
        let user = User.findOne({email: req.body.email});
        if(user) res.status(400).send('User already registered');

        user = new User(_.pick(req.body, ['name', 'email', 'password','role']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
    }
}