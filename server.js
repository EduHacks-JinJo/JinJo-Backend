var express = require('express'),
    cors = require('cors'),
    app = express(),
    port = process.env.PORT || 8082,
    mongoose = require('mongoose'),
    Instructors = require('./api/models/instructorsModel'),
    Classrooms = require('./api/models/classroomModel'),
    Questions = require('./api/models/questionModel'),
    bodyParser = require('body-parser'),
    http = require('http').Server(app),
    socket = require('socket.io')(http);

var passport = require('passport');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
var uri = 'mongodb://admin:securepass@ds155934.mlab.com:55934/jinjo';
var options = {useMongoClient: true};
mongoose.connect(uri, options);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

socket.on('connection', function (socket) {
    // socket connected
    console.log('Connect established to Local Server');
});

// Add headers
app.use(cors());


var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Jinjo Server started on: ' + port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});
