'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecruiterSchema = new Schema({
  company: String,
  job_postings: Array,
  users_saved: Array
});

module.exports = mongoose.model('Recruiter', RecruiterSchema);