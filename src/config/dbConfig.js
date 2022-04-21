const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://0.0.0.0/sharelink',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then( () => console.log('connected to the database'))
    .catch(err => console.error('could not connect to db..',err));
}