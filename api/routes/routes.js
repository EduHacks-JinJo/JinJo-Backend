'use strict';

module.exports = function(app) {
    var instructor = require('../controllers/instructorsController');

    app.route('/auth/login').post(instructor.login_instructor);
    app.route('/auth/create').post(instructor.create_instructor);
    app.route('/instructors').post(instructor.get_all_instructors);

    /** example stuff
    var user = require('../controllers/userController');

    // user Routes
    app.route('/').post(user.create_user);
    app.route('/users').get(authController.isAuthenticated, user.get_all_users);
     **/
};