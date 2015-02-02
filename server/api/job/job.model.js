'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JobSchema = new Schema({
//indeed
  jobkey: String,
  jobtitle: String,
  snippet: String, 
  formattedLocation: String, 
  company: String, 
  expired: Boolean, 
  url: String, 
//cheerio
  qualifications: String, 
  job_picture: String,
  salary: String, 
  contact_information: String,
  user_ids: Array, 
  recruiter_id: String
});

module.exports = mongoose.model('Job', JobSchema);