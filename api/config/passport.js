var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/user');
var config = require('../config/config'); // get db config file

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
  passport.use(new JWTStrategy(opts, function(jwtPayload, done) {
    const data = JSON.parse(JSON.stringify(jwtPayload));
    User.findOne({_id: data._id}, function(err, user) {
      if (user) {
        done(null, user);
      } else if (err) {
        return done(err, false);
      } else {
        done(null, false);
      }
    });
  }));
};
