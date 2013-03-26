var express = require('express'),
    path = require('path'),
    http = require('http');

var config = require('./config').config,
    items = require('./routes/items');

var app = express();

app.configure(function () {
    app.set('port', config.app.port || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.favicon());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
});

//Test response for base
app.get('/', items.findAll);
app.get('/items', items.findAll);
app.get('/items/:id', items.find);
app.post('/items', items.addItem);
app.put('/items/:id', items.updateItem);
app.delete('/items/:id', items.deleteItem);

app.listen(app.get('port'), function() {
    console.log("Server listening on port " + app.get('port'));
});