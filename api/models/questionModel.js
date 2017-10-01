var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var QuestionSchema = new Schema({
    question: String,
    upvotes: Number,
    classID: String,
    isAnswered: Boolean
});

module.exports = mongoose.model('Questions', QuestionSchema);