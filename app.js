var express = require('express'),
    path = require('path'),
    http = require('http');

var config = require('./config').config,
    items = require('./routes/items'),
    passportConfig = require("./passport-config"),
    passport = require('passport'),
    mongoose = require('mongoose');

var app = express();

//App config
app.configure(function () {
    app.set('port', config.app.port || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.favicon());
    app.use(express.methodOverride());
    app.use(express.cookieParser('something simple this way walks'));
    app.use(express.session());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

//Passport settings
passportConfig();

// POST /login
app.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })
);

//Test response for base
app.get('/', items.findAll); //Test show list of all items
app.get('/items', ensureAuthenticated, items.findAll); // All items
app.get('/items/:id', items.find); // Find item by id
app.post('/items', items.addItem); // Add new item
app.put('/items/:id', items.updateItem); // Update item
app.delete('/items/:id', items.deleteItem); //Delete item

app.listen(app.get('port'), function() {
    console.log("Server listening on port " + app.get('port'));
});

//TODO:Add full session support and hash with sold
//Base chech for authentification
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}