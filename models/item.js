var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    name: String,
    year: String,
    price: Number,
    description: String,
    picture: String
});

var Item = mongoose.model('Item', itemSchema);

//Add test item data to bd
function testItemInit() {
    for(var i=0; i<10; i++) {
        var testItem = new Item({name:"qwe" + i, year:"123", price:213, description:"qwe", picture:"qweqwe"});
        testItem.save(function(err){
            if (err) {
                console.log("Error saved");
                throw err;
            }
            console.log("Saved");
        });
    }
}

exports.model = Item;
exports.schema = itemSchema;


