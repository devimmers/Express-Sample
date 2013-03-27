var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    name: String,
    year: String,
    price: Number,
    description: String,
    picture: String
});
var Item = mongoose.model('Item', itemSchema);

var test_item = new Item({name:"qwe", year:"123", price:213, description:"qwe", picture:"qweqwe"});

function baseInit() {
    for(var i=0; i<10; i++) {
        test_item.save(function(err){
            if (err) {
                console.log("Eroro saved");
                res.send("Fail");
                throw err;
            }
            console.log("Saved");
        });
    }
}

baseInit();
exports.model = Item;
exports.schema = itemSchema;


