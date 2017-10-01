'use strict';


var mongoose = require('mongoose'),
    Instructor = mongoose.model('Instructors');
var jwt = require('jsonwebtoken');

// Takes in
// make new
exports.create_instructor = function(req, res) {
    var new_instructor = new Instructor(req.body);
    new_instructor.save(function (err, user) {
        if (err)
            res.send(err);

        // Generate Token
        var token = jwt.sign({data: user}, 'this_is_a_test_secret_do_not_use_for_the_love_of_god', {
            expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
            message: 'New User Created',
            token: token
        });
    });
};
// get all
exports.get_all_instructors = function(req, res) {
    Instructor.find({}, function(err, instructors) {
        if (err)
            res.send(err);
        res.json(instructors);
    });
};
// login
exports.login_instructor = function(req, res) {
    try {
        Instructor.findOne({email: req.body.email, password: req.body.password},
            function (err, instructors) {
                if (err) return null;

                if (instructors !== null) {
                    //Generate Token
                    var token = jwt.sign({data: instructors}, 'this_is_a_test_secret_do_not_use_for_the_love_of_god', {
                        expiresIn: 2880 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        message: 'Login Successful',
                        token: token
                    });
                } else {
                    res.sendStatus(401);
                }
            });

    } catch (e) {
        console.log('Error: ', e);
        res.json({message: e});
    }
};
