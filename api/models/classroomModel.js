var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClassroomSchema = new Schema({
    roomID: String,
    teacherID: String,
    date: Date,
    classname: String,
    courseID: String
});

module.exports = mongoose.model('Classrooms', ClassroomSchema);