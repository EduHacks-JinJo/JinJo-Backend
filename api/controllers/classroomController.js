'use strict';

var mongoose = require('mongoose'),
    Instructor = mongoose.model('Instructors');

exports.create_classroom = function(req, res) {
    var new_classroom = new Classrooms(req.body);
    new_classroom.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.get_all_classrooms = function(req, res) {
    Classrooms.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};