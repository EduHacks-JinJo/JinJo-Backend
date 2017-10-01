var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var questionSchema = new Schema({
    question: String,
    upvotes: Number,
    classID: Number
});

module.exports = mongoose.model('Instructors', InstructorSchema);