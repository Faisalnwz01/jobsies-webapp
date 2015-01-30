'use strict';

var _ = require('lodash');
var Recruiter = require('./recruiter.model');

// Get list of recruiters
exports.index = function(req, res) {
  Recruiter.find(function (err, recruiters) {
    if(err) { return handleError(res, err); }
    return res.json(200, recruiters);
  });
};

// Get a single recruiter
exports.show = function(req, res) {
  Recruiter.findById(req.params.id, function (err, recruiter) {
    if(err) { return handleError(res, err); }
    if(!recruiter) { return res.send(404); }
    return res.json(recruiter);
  });
};

// Creates a new recruiter in the DB.
exports.create = function(req, res) {
  Recruiter.create(req.body, function(err, recruiter) {
    if(err) { return handleError(res, err); }
    return res.json(201, recruiter);
  });
};

// Updates an existing recruiter in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Recruiter.findById(req.params.id, function (err, recruiter) {
    if (err) { return handleError(res, err); }
    if(!recruiter) { return res.send(404); }
    var updated = _.merge(recruiter, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, recruiter);
    });
  });
};

// Deletes a recruiter from the DB.
exports.destroy = function(req, res) {
  Recruiter.findById(req.params.id, function (err, recruiter) {
    if(err) { return handleError(res, err); }
    if(!recruiter) { return res.send(404); }
    recruiter.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}