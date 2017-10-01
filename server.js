var express = require('express'),
    cors = require('cors'),
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

// Add headers
app.use(cors());


var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Jinjo Server started on: ' + port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});
