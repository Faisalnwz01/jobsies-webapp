'use strict';

var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');
var Job = require('./job.model');
var async = require('async');
var underscore = require('underscore');
var Indeed = require('../../../client/app/main/indeed');


// Get list of jobs
exports.index = function(req, res) {
    Job.find(function(err, jobs) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, jobs);
    });
};

//get jobs from the indeed api
exports.getIndeedJobs = function(req, res) {
    var query = req.body.query;
    var location = req.body.location;
    var start = req.body.start;
    var indeed_client = new Indeed("85923786885096");
    indeed_client.search({
            q: query,
            l: location,
            limit: '1000',
            start: start,
            allbit: '1',
            highlight: 0,
            userip: '1.2.3.4',
            useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2)',
        }, function(search_response){
          res.json(200, search_response)
        } 
      )
    }

    // Get a single job
    exports.show = function(req, res) {
        Job.find({
            jobkey: req.params.id
        }, function(err, job) {
            if (err) {
                return handleError(res, err);
            }
            if (!job) {
                return res.send(404);
            }
            return res.json(job);
        });
    };

    exports.jobShow = function(req, res) {
        Job.find({
            _id: req.params.id
        })
            .populate('user_ids')
            .exec(function(err, job) {
                console.log(job)
                if (err) {
                    return handleError(res, err);
                }
                if (!job) {
                    return res.send(404);
                }
                return res.json(job);
            });
    };
    //remove a specific user from the recruiters job 
    exports.removeUser = function(req, res, next) {
        var userId = req.params.userId;
        var jobId = req.params.id;
        Job.findById(jobId, function(err, job) {
            job.removeUser(userId)
            if (err) return next(err);
            if (!job) return res.send(401);
            res.json(job);
        });
    };
    //get single recruiter job
    exports.getRecruiterJobs = function(req, res) {
        Job.find({
            _id: req.params.id
        }, function(err, job) {
            if (err) {
                return handleError(res, err);
            }
            if (!job) {
                return res.send(404);
            }
            return res.json(job);
        });
    };

    // Creates a new job in the DB.
    exports.create = function(req, res) {
        Job.create(req.body, function(err, job) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(201, job);
        });
    };

    // Updates an existing job in the DB.
    exports.update = function(req, res) {
        console.log(req.body)
        if (req.body._id) {
            delete req.body._id;
        }
        Job.findOne({
            jobkey: req.params.id
        }, function(err, job) {
            if (err) {
                return handleError(res, err);
            }
            if (!job) {
                return res.send(404);
            }
            var updated = underscore.extend(job, req.body);
            updated.save(function(err) {
                if (err) {
                    return handleError(res, err);
                }
                return res.json(200, job);
            });
        });
    };
    //update recruiter jobs
    exports.updateRecruiterJob = function(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        Job.findOne({
            _id: req.params.id
        }, function(err, job) {
            if (err) {
                return handleError(res, err);
            }
            if (!job) {
                return res.send(404);
            }
            var updated = underscore.extend(job, req.body);
            updated.save(function(err) {
                if (err) {
                    return handleError(res, err);
                }
                return res.json(200, job);
            });
        });
    };



    // Deletes a job from the DB.
    exports.destroy = function(req, res) {
        Job.findById(req.params.id, function(err, job) {
            if (err) {
                return handleError(res, err);
            }
            if (!job) {
                return res.send(404);
            }
            job.remove(function(err) {
                if (err) {
                    return handleError(res, err);
                }
                return res.send(204);
            });
        });
    };

    var qualReg = /[Q][uU][aA][lL][iI][fF][iI][cC][aA][tT][iI][oO][nN]/g;
    var reqReg = /[R][Ee][Qq][Uu][Ii][Rr][Ee][Mm][Ee][Nn][Tt]/g;
    var skillReg = /[S][Kk][Ii][lL][Ll][Ss]/g;
    var contactReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    exports.getCheerio = function(req, res) {
        var cheerioStuff = function(item, cb) {
            var url = item.url;
            var indeedId = item.indeedId
            request.get({
                url: url
            }, function(err, response) {
                var htmlFromIndeed = response.body;
                var $ = cheerio.load(htmlFromIndeed);
                var logo = $('.cmp_logo').find('img').attr('src');
                var summary_text = $('#job_summary').text();
                var summaryIndex = summary_text.search(qualReg);
                var requirementIndex = summary_text.search(reqReg);
                var skillsIndex = summary_text.search(skillReg);
                var contact_information = summary_text.match(contactReg);
                var summary = summary_text.slice(summaryIndex, summaryIndex + 500) ||
                    summary_text.slice(requirementIndex, requirementIndex + 500) ||
                    summary_text.slice(skillsIndex, skillsIndex + 500) ||
                    "NA";
                console.log(contact_information)
                var new_stuff = {
                    logo: logo,
                    summary: summary,
                    contact_information: contact_information
                };
                var updated = _.merge(item, new_stuff);
                cb(err, updated);
            })
        }
        async.map(req.body, cheerioStuff, function(err, results) {
            res.send(results)
        })
    }

    function handleError(res, err) {
        return res.send(500, err);
    }