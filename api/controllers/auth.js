// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var jwt    = require('jsonwebtoken');

exports.verifyToken = function (token, next) {
    //Decode token
    jwt.verify(token, 'this_is_a_test_secret_do_not_use_for_the_love_of_god' , function(err, decoded) {
        if (err) {
            console.log('Error in verifying token: ', err);
            next(null);
        } else {
            // if everything is good, save to request for use in other routes
            next(decoded);
        }
    });
};

exports.isAuthenticated = passport.authenticate('basic', { session : false });