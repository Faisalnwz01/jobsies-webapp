'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JobSchema = new Schema({
	job_id: {type: String, required: true },
	title: {type: String, required: true },
	description: String,
	salary_min: Number,
	salary_max: Number,
	info_link: String,
	skills_required: Array,
	contact_info: String,
	
});

module.exports = mongoose.model('Job', JobSchema);