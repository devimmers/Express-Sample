var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/itemsdb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var itemSchema = mongoose.Schema({
    name: String,
    year: String,
    price: Number,
    description: String,
    picture: String
})

var Item = mongoose.model('Item', itemSchema)

var exampleItem = new Item({
    name: "qweqwe",
    year: "2022",
    price: 55,
    description: "asd",
    picture: "asdasd"
})


exampleItem.save(function (err, data) {
    if (err) // TODO handle the error
        data.speak();
});

Item.find({}, function(error, data){
    console.log(data);
});