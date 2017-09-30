var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var InstructorSchema = new Schema({
    username: String,
    password: String
});

InstructorSchema.pre('save', function(next){
    var hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
    next();
});

InstructorSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('Instructors', InstructorSchema);