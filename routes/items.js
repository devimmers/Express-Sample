var mongoose = require('mongoose'),
    Item = require('../models/item.js').model;

mongoose.connect('mongodb://localhost/itemsdb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//Create test Item
var exampleItem = new Item({
    name: "qweqwe",
    year: "2022",
    price: 55,
    description: "asd",
    picture: "asdasd"
});

//Find all items
exports.findAll = function() {
    Item.find({}, function(error, data){
        console.log(data);
    });
};

exampleItem.save(function (err, data) {
    if (err) // TODO handle the error
        data.speak();
});

Item.find({}, function(error, data){
    console.log(data);
});