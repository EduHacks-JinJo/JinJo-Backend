'use strict';

var mongoose = require('mongoose'),
    Classrooms = mongoose.model('Classrooms');

var auth = require('../controllers/auth');


function makeID() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 4; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/**
 * req = courseID, classname
 * In function, assign Date and the room code, and teacher id (based on token)
 * Return room code
 * */
exports.create_classroom = function(req, res) {
    auth.verifyToken(req.headers.token, function(decoded) {
        req.decoded = decoded;

        if (decoded === null) {
            return res.sendStatus(401);
        }

        try {
            var roomID = makeID();
            var date = new Date();
            var classname = req.body.classname;
            var courseID = req.body.courseID;

            var new_classroom = new Classrooms({
                roomID: roomID,
                teacherID: decoded.data._id,
                date: date,
                classname: classname,
                courseID:courseID
        });
            new_classroom.save(function(err, task) {
                if (err) {
                    console.log('Error in saving ', err);
                    res.send(err);
                } else {
                    res.json(roomID);
                }
            });

        } catch(e) {
            console.log('Error: ', e);
            res.json({ message: e});
        }
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

/**
 * req = courseID, token
 * Find teacher id based on token,
 * then pass that to find classrooms with teacherID and courseID
 * */
exports.get_classrooms = function(req,res) {
    try {
        auth.verifyToken(req.headers.token, function(decoded) {
            req.decoded = decoded;

            if (decoded === null) {
                return res.sendStatus(401);
            }

            try {
                var decodedID = decoded.data._id;
                Classrooms.find({
                    teacherID: decodedID,
                    courseID: req.body.courseID
                }, function(err, classrooms) {
                    if (err) return null;
                    if (classrooms !== null) {
                        res.json(classrooms);
                    }
                });
            } catch(e) {
                console.log('Error: ', e);
                res.json({ message: e});
            }
        });
    } catch (e) {
        console.log('Error: ', e);
        res.json({message: e});
    }
};


/**
 * req = token
 * Use token to find all classes by one instructor id,
 * then return so no duplicates
 * db.collection.distinct
 */
exports.get_all_courses = function(req, res) {
    try {
        auth.verifyToken(req.headers.token, function(decoded) {
            req.decoded = decoded;

            if (decoded === null) {
                return res.sendStatus(401);
            }

            try {
                var decodedID = decoded.data._id;

                Classrooms.find({
                    teacherID: decodedID
                }).distinct('courseID', function(err, classrooms) {
                    if (err) return null;
                    if (classrooms !== null) {
                        res.json(classrooms);
                    }
                });
            } catch(e) {
                console.log('Error: ', e);
                res.json({ message: e});
            }
        });
    } catch (e) {
        console.log('Error: ', e);
        res.json({message: e});
    }
};
