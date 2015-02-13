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
  // user_ids are the users that have liked a job
  user_ids: [{type: Schema.Types.ObjectId, ref: 'User'}], 
  // users_saved are the users that a recruiter has liked
  users_saved: [{type: Schema.Types.ObjectId, ref: 'User'}],
  recruiter_id: String
});

JobSchema.methods.removeUser = function(userId){
  var userIndex = this.user_ids.indexOf(userId)
    if (userIndex > -1){
      this.user_ids.splice(userIndex, 1)
    }
    this.save();
    return this;
}
module.exports = mongoose.model('Job', JobSchema);