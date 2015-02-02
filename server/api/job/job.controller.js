'use strict';

var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');
var Job = require('./job.model');
var async = require('async');

// Get list of jobs
exports.index = function(req, res) {
  Job.find(function (err, jobs) {
    if(err) { return handleError(res, err); }
    return res.json(200, jobs);
  });
};

// Get a single job
exports.show = function(req, res) {
  Job.findById(req.params.id, function (err, job) {
    if(err) { return handleError(res, err); }
    if(!job) { return res.send(404); }
    return res.json(job);
  });
};

// Creates a new job in the DB.
exports.create = function(req, res) {
  Job.create(req.body, function(err, job) {
    if(err) { return handleError(res, err); }
    return res.json(201, job);
  });
};

// Updates an existing job in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Job.findById(req.params.id, function (err, job) {
    if (err) { return handleError(res, err); }
    if(!job) { return res.send(404); }
    var updated = _.merge(job, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, job);
    });
  });
};




// Deletes a job from the DB.
exports.destroy = function(req, res) {
  Job.findById(req.params.id, function (err, job) {
    if(err) { return handleError(res, err); }
    if(!job) { return res.send(404); }
    job.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.getCheerio = function(req, res){
  var cheerioStuff = function(item, cb) {
    var url = item.url;
    var indeedId = item.indeedId
    request.get({
      url: url
    }, function (err, response) {
      //var for regular expressions
      var qualReg = /[Q][uU][aA][lL][iI][fF][iI][cC][aA][tT][iI][oO][nN]/g;
      var reqReg = /[R][Ee][Qq][Uu][Ii][Rr][Ee][Mm][Ee][Nn][Tt]/g;
      var skillReg = /[S][Kk][Ii][lL][Ll][Ss]/g;
      var contactReg = /^([a-zA-Z0-9_\.\-])+\@([a-zA-Z0-9\-])+\.([a-zA-Z0-9]{3})+$/g;
      var htmlFromIndeed = response.body;
      var $ = cheerio.load(htmlFromIndeed);
      var logo = $('.cmp_logo').find('img').attr('src');
        var summary_text = $('#job_summary').text();
        var summaryIndex = summary_text.search(qualReg);
        var requirementIndex =  summary_text.search(reqReg);
        var skillsIndex = summary_text.search(skillReg);
        var contact = summary_text.search(contactReg);
        console.log(contact, "contact")
        var summary = summary_text.slice(summaryIndex, summaryIndex+500) || 
        summary_text.slice(requirementIndex, requirementIndex+500) ||
        summary_text.slice(skillsIndex, skillsIndex+500) ||
        "NA";
        var new_stuff = {logo: logo, summary: summary};
        var updated = _.merge(item, new_stuff);
        cb(err, updated);
      })
      }

      async.map(req.body, cheerioStuff, function(err, results){

        res.send(results)
      })
  // var cheerioResponse = [];
  // for(var i=0; i<req.body.length; i++){
  //   var url = req.body[i].url;
  //   request.get({
  //       url: url
  //   }, function (err, response) {
  //       var htmlFromIndeed = response.body;
  //       // Cheerio stuff.
  //       // if(err) { return handleError(res, err); }
  //       // if(!response) { return res.send(404); }
  //       var $ = cheerio.load(htmlFromIndeed);
  //       var logo = $('.cmp_logo').find('img').attr('src');
  //       var summary = $('#job_summary').text().split('\n');
  //       cheerioResponse.push({logo: logo});
  //      // console.log(i, "i")
  //       if(i==24){
  //         res.send(cheerioResponse)
  //          console.log("cheerio", cheerioResponse)
  //       }
  //   });
  // }

}

function handleError(res, err) {
  return res.send(500, err);
}