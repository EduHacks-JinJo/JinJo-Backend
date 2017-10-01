var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InstructorSchema = new Schema({
    email: String,
    password: String
});

module.exports = mongoose.model('Instructors', InstructorSchema);