var express = require('express'),
    path = require('path'),
    http = require('http');

var config = require('./config').config,
    items = require('./routes/items')
    , User = require('./models/User')
    , mongoose = require('mongoose')
    , passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

var app = express();

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            user.validPassword(password, function(valid) {
                if (!valid) {
                    return done(null, false, { message: 'Invalid password' });
                } else {
                    return done(null, user);
                }
            });
            return done(null, user);
        });
    }
));

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

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

app.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })
);

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