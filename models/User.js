var mongoose = require('mongoose');

var User = new mongoose.Schema({
    name: String
});

exports.model = mongoose.model('User', User);


