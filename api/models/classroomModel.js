var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var ClassroomSchema = new Schema({
    roomID: String,
    teacherID: Number,
    date: Date,
    classname: String,
    courseID: Number
});

module.exports = mongoose.model('Classrooms', ClassroomSchema);