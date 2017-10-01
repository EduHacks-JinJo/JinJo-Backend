'use strict';

var mongoose = require('mongoose'),
    Classrooms = mongoose.model('Classrooms');

// create new
//TODO add token
exports.create_classroom = function(req, res) {
    var new_classroom = new Classrooms(req.body);
    new_classroom.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

// get all
exports.get_all_classrooms = function(req, res) {
    Classrooms.find({}, function(err, classrooms) {
        if (err)
            res.send(err);
        res.json(classrooms);
    });



};