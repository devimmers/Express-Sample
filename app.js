var express = require('express'),
    path = require('path'),
    http = require('http'),
    items = require('./routes/items');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
});



app.get('/items', items.findAll);
app.get('/items/:id', items.find);

/*
app.get('/items/:id', items.findById);
app.post('/items', items.addItem);
app.put('/items/:id', items.updateItem);
app.delete('/items/:id', items.deleteItem);
  */
app.listen(3000);
console.log('Listening on port 3000...');