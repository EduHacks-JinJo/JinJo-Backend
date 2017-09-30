'use strict';


var mongoose = require('mongoose'),
    Instructor = mongoose.model('Instructors');

/**
exports.create_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.get_all_users = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};
**/