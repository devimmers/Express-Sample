var mongoose = require('mongoose'),
    Item = require('../models/item.js').model,
    config = require('../config.js').config;

mongoose.connect(config.mongo.adress);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

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

//Find item by id
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

// Add new item
exports.addItem = function(req, res) {
    var item = req.body;
    var save_item = new Item(item);
    console.log('Add item: ' + JSON.stringify(item));
    save_item.save(function(err){
        if (err) {
            console.log("Eroro saved");
            res.send("Fail");
            throw err;
        }
        console.log("Saved");
        res.send("Succesed");
    });
};

// Update item
exports.updateItem = function(req, res) {
    var id = req.params.id;
    var item = req.body;
    console.log('Update to item: ' + JSON.stringify(item));
    Item.update({_id:id}, item, {safe:true}, function(error, result) {
        if (error) {
            console.log("Error update");
        }
        res.send(result);
    });
};

//Delete item
exports.deleteItem = function(req, res) {
    var id = req.params.id;
    console.log('Delete item by id: ' + id);
    Item.remove({_id:id}, function(error) {
        if (error) {
            res.send("Fail delete");
        }
        console.log("Deleted");
        res.send("Succesed");
    });
};
