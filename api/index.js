const express = require('express')
const app = express()
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('./config/passport')(passport);

mongoose.connect(config.database);

const User = require("./models/user");

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




app.listen(5000)
