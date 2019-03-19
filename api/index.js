const express = require('express')
const app = express()
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

require('./config/passport')(passport);

mongoose.connect(config.database);
const User = require("./models/user");

var domain = 'mg.bfloschool.com';
var auth = {
  auth: {
    api_key: config.api_key,
    domain: domain
  }
}

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var handlebars = require('handlebars');

var nodemailerMailgun = nodemailer.createTransport(mg(auth));
var mailgun = require('mailgun-js')({ apiKey: config.api_key, domain: domain });
var mailcomposer = require('mailcomposer');

var file = JSON.parse(fs.readFileSync('data.json'));
app.use(cors());
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello There!')
})

app.get('/users', function (req, res) {
  User.find({ }, function(err, users) {
    if (err) {
      res.status(400).send({message: err.message});
    } else {
      res.status(200).send({users: users});
    }
  })
})

app.post('/signup', function (req, res) {
  var newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password
  });
  newUser.save(function(err, user) {
    console.log(user)
    if (!err) {
      var token = jwt.sign(JSON.parse(JSON.stringify(user)), config.secret);
      res.status(200).send({message: "success", token: 'JWT ' + token, user: user})
    } else {
      res.status(400).send({message: err.message});
    }
  });
})

app.post('/login', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (!user) {
      res.status(401).send({error: true, message: 'authentication failed, user not found.'});
    } else {
      user.checkPassword(req.body.password, function (err, matchFound) {
        if (matchFound && !err) {
          var token = jwt.sign(JSON.parse(JSON.stringify(user)), config.secret);
          res.status(200).send({token: 'JWT ' + token, message: "success", user: user})
        } else {
          res.status(401).send({error: true, message: 'authentication failed'});
        }
      });
    }
  });
});

/**
 * POST API /api/user/reset
 * Request a reset for your password
 * @param {string} username - username
 * @return {JSON}
 */
app.post('/reset', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) {
       res.status(400).send({success: false, message: "user not found"});
    }
    const expiration  = moment().add(1, 'hours');
    var token = jwt.sign({ user: user, expiresIn: expiration }, config.secret);

    var resetLink = 'http://localhost:3000/reset/'+token; // update this with your website's port if needed
    nodemailerMailgun.sendMail({
     from: 'Marketplace Support <support@example.com>',
     to: user.email,
     subject: 'Reset your Password',
     html: 'Thanks for requesting a reset. Click <a href="'+resetLink+'">here</a> to reset your password'
    }, function (err, info) {
      if (err) {
        res.status(400).send({success: false, message: "error"});
      } else {
        res.status(200).send({success: true, message: "email sent"});
      }
    });
  });
});

/**
* POST API /api/user/reset/new
* Create your new password
* @param {string} token - token
* @param {string} password - password
* @return {JSON}
*/
app.post('/reset/new', function(req, res) {
  var token = req.body.token;
  var newPassword = req.body.password;
  if (!token || !newPassword) {
    res.status(400).send({success: false, message: 'missing parameters'})
  }
  var decoded = jwt.verify(token, config.secret);
  const userId = decoded.user._id;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(newPassword, salt, null, function (err, hash) {
      if (err) {
        res.status(400).send({success: false, message: "error"});
      }
      if (moment(decoded.expiresIn).isAfter()) {
        User.findOneAndUpdate({ _id: userId }, {
          $set: { password: hash, passwordReset: true },
        }, {upsert:true}, function(err, updatedUser) {
          if (!err) {
            var newToken = jwt.sign(JSON.parse(JSON.stringify(updatedUser)), config.secret);
            res.status(200).send({success: true, token: 'JWT ' + newToken, user: updatedUser});
          } else {
            res.status(400).send({success: false, message: "error"});
          }
        });
      }
    });
  });
});

app.get('/api/marketplace', function (req, res) {
  res.json(file)
})

app.get('/api/profile/:userId', passport.authenticate('jwt', { session: false}), function(req, res) {
  User.findOne({
    email: req.params.userId
  }, function(err, user) {
    if (!user) {
      res.status(401).send({error: true, message: 'authentication failed'});
    } else {
      res.status(200).send({token: 'JWT ' + token, message: "success"})
    }
  });
});

app.listen(proess.env.PORT || 5000)
