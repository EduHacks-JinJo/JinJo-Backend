var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Instructors = require('./api/models/instructorsModel'),
    bodyParser = require('body-parser');

var passport = require('passport');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
var uri = 'mongodb://admin:securepass@ds155934.mlab.com:55934/jinjo';
var options = {useMongoClient: true};
mongoose.connect(uri, options);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());


var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Jinjo Server started on: ' + port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
