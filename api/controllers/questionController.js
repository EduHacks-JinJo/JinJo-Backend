'use strict';

var mongoose = require('mongoose'),
    Instructor = mongoose.model('Instructors');

exports.create_question = function(req, res) {
    var new_question = new Questions(req.body);
    new_question.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.get_all_questions = function(req, res) {
    Questions.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};