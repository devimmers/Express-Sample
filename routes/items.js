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
exports.findAll = function(req, res) {
    console.log('Find All');

    Item.find({}, function(error, data){
        if (error) {
            console.log("Error");
        }
        res.send(data);
    });
};

exports.find = function(req, res) {
    var id = req.params.id;
    console.log('Find by id: ' + id);

    Item.find({_id:id}, function(error, data){
        if(error) {
            console.log("Error finding by id :" + id);
        }
        res.send(data);
    });
};

