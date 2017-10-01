'use strict';

var mongoose = require('mongoose'),
    Questions = mongoose.model('Questions'),
    Classrooms = mongoose.model('Classrooms');


// create question

/**
 * req = class id
 * */
exports.create_question = function(req, res) {
    var new_question = new Questions({
        question: req.body.question,
        upvotes: 0,
        classID: req.body.roomID,
        isAnswered: false
    });
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

// get given a roomID (code) find questions
exports.get_questions = function(req,res) {
    try {
        Classrooms.findOne({roomID: req.body.roomID},
            function(err, classroom) {
                if (classroom !== null) {
                    Questions.find({
                        classID: classroom._id
                    }, function(err, questions) {
                        if (err) return null;
                        if (questions !== null) {
                            res.json(questions);
                        }
                    });
                }
            });
    } catch(e) {
        console.log('Error: ', e);
        res.json({ message: e});
    }
};
// answer q

exports.answer_question = function(req, res){
try {
        Questions.findOneAndUpdate({_id: req.body.id}, {$set: {isAnswered: true}}, {new:true}, function(err, questions) {
        if (err)
            res.send(err);
        res.json(questions);
    });
    } catch (e) {
        console.log('Error: ', e);
        res.json({message: e});
    }
};

exports.upvote = function(req, res){
try {
        Questions.findOneAndUpdate({_id: req.body.id}, {$inc: {upvotes: 1}}, {new:true}, function(err, questions) {
        if (err)
            res.send(err);
        res.json(questions);
    });
    } catch (e) {
        console.log('Error: ', e);
        res.json({message: e});
    }
};

exports.downvote = function(req, res){
try {
        Questions.findOneAndUpdate({_id: req.body.id}, { $inc: {upvotes: -1}}, {new:true}, function(err, questions) {
        if (err)
            res.send(err);
        res.json(questions);
    });
    } catch (e) {
        console.log('Error: ', e);
        res.json({message: e});
    }
};
