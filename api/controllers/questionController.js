'use strict';

var mongoose = require('mongoose'),
    Questions = mongoose.model('Questions');

// create question

exports.create_question = function(req, res) {
    var new_question = new Questions(req.body);

    new_question.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

// get all 
// don't use this for classrooms
exports.get_all_questions = function(req, res) {
    Questions.find({}, function(err, questions) {
        if (err)
            res.send(err);
        res.json(questions);
    });
};

// get given a classroomid find questions
exports.get_questions = function(req,res) {
try {
        Questions.find({classID: req.body.id},
            function (err, questions) {
                if (err) return null;
                if (questions !== null) {
                    res.json(questions)
                }
            });
    } catch (e) {
        console.log('Error: ', e);
        res.json({message: e});
    }
};

// answer q 

exports.answer_question = function(req, res){
try {
        Questions.findOneAndUpdate({_id: req.body.id}, {$set isAnswered: true},
            function (err, questions) {
                if (err) return null;
            });
    } catch (e) {
        console.log('Error: ', e);
        res.json({message: e});
    }
};

