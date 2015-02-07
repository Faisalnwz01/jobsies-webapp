'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JobSchema = new Schema({
//indeed
  jobkey: String,
  jobtitle: String,
  snippet: String, 
  summary: String,
  logo: String,
  formattedLocationFull: String, 
  formattedRelativeTime: String,
  date: String,
  company: String, 
  expired: Boolean, 
  url: String, 
  numLikes: Number,
//cheerio
  qualifications: String, 
  job_picture: String,
  salary: String, 
  contact_information: Array,
  user_ids: [{type: Schema.Types.ObjectId, ref: 'User'}], 
  users_saved: [{type: Schema.Types.ObjectId, ref: 'User'}],
  recruiter_id: String
});

module.exports = mongoose.model('Job', JobSchema);