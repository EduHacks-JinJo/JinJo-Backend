'use strict';

module.exports = function(app) {
    var instructor = require('../controllers/instructorsController');

    app.route('/auth/login').post(instructor.login_instructor);
    app.route('/auth/create').post(instructor.create_instructor);
    app.route('/instructors').get(instructor.get_all_instructors);

    var classroom = require('../controllers/classroomController');
    app.route('/createroom').post(classroom.create_classroom);
    app.route('/allclassrooms').get(classroom.get_all_classrooms);
    app.route('/classrooms').post(classroom.get_classrooms);
    app.route('/classrooms/courses').post(classroom.get_all_courses);

    //app.route('/answer').post(classroom.answer_question);

    var question = require('../controllers/questionController');
    app.route('/allquestions').get(question.get_all_questions);
    app.route('/questions').post(question.get_questions);
    app.route('/question').post(question.create_question);
};