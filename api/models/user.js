var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}); 


/* pre save hook */
UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});


/* checkPassword User schema method */
UserSchema.methods.checkPassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, matchFound) {
    if (err) {
      return cb(err);
    }
    cb(null, matchFound);
  });
};


module.exports = mongoose.model('User', UserSchema);
