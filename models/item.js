var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    name: String,
    year: String,
    price: Number,
    description: String,
    picture: String
});

exports.model = mongoose.model('Item', itemSchema);
exports.schema = itemSchema;


