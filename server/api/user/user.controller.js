'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var underscore = require('underscore'); 

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};


exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var updated = underscore.extend(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, updated);
    });
  });
};

exports.savedUsers = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    user.users_saved.push(req.body.users_saved);
    user.save(function (err, user) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

exports.jobPost = function(req, res) {
  console.log('hit on backend')
  User.findById(req.params.id, function (err, user) {
    console.log(user, 'user')
    console.log(req.body, 'req.bodyyyyyy')
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    user.job_postings.push(req.body.job_postings);
    user.save(function (err, user) {
        console.log(user, 'updatedddddddd')
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

/**
 * Get a single user
 */
exports.resume = function (req, res, next) {
  var userId = req.params.id;
  console.log(req.params)

  User.findById(userId, function (err, user) {
    console.log(user)
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user);
  });
};
/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};
////add jobsies
exports.addJobsie = function(req, res, next){
   if(req.body._id) { delete req.body._id; }
   User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    user.jobs_saved.push(req.body.jobs_saved);
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
}
/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

exports.preferences = function(req, res, next){
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var updated = underscore.extend(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, updated);
    });
  });
}
function handleError(res, err) {
  return res.send(500, err);
}
