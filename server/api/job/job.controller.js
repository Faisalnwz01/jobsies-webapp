'use strict';

var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');
var Job = require('./job.model');
var User = require('../user/user.model');
var async = require('async');
var underscore = require('underscore');
var Indeed = require('../../components/indeed-api/api.js').getInstance('4024430501334376')


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
    var city = req.body.city;
    var state = req.body.state;
    var start = req.body.start;
    var user = req.body.user_info;
    async.parallel([ 
        function(cb){
            Indeed.JobSearch()
            .Radius(20)
            .WhereLocation({
                city: city,
                state: state
            })
            .Limit(12)
            .WhereKeywords([query])
            .Start(start)
            .SortBy("date")
            .UserIP('1.2.3.4')
            .UserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2)')
            .Search(
                function(results) {
                    cb(null, {total:results.totalResults, jobs:results.results});
                },
                function(error) {
                    console.log(error);
                })
        },
        function(cb){
              User.findById(user)
                .populate('jobs_saved')
                .exec(function(err, user){
                   if (err) return next(err);
                   if (!user) return res.send(401);
                   cb(null, user.jobs_saved);
                });
        }
    ],
    function(err, results){
        var totalResultsToSendBack = results[0].total;
        var jobsFromIndeed = results[0].jobs;
        var jobsSavedByUser = results[1];

        var savedJobKeys = [];
        for (var j=0; j<jobsSavedByUser.length; j++) {
            savedJobKeys.push(jobsSavedByUser[j].jobkey)
        }

        var jobArray = [];
        for (var i=0; i<jobsFromIndeed.length; i++){
            if (savedJobKeys.indexOf(jobsFromIndeed[i].jobkey) === -1) {
                jobArray.push(jobsFromIndeed[i])
            }
        }
        if(jobArray.length == 0 && (start+12)<totalResultsToSendBack){
            exports.getIndeedJobs({query: query, city: city, state: state, start: (start+12) ,user: user})
        }
        else if(jobArray.length == 0){
            res.json([{jobtitle: "No More Jobs", company:"Jobsies", snippet: "There are no more results for the current criteria. Please change your search preferences to a different job title or skill.                                                                                "}])
        }
        else{
            exports.getCheerio(jobArray, res)
        }
    })
}

// Get a single job
exports.show = function(req, res) {
    var job = req.body.job;
    var user = req.body.user;
    async.parallel([
        function(cb){
            Job.find({
                jobkey: req.params.id
            })
            .exec(function(err, job){
                   if (err) return next(err);
                   if (!job) return res.send(401);
                   cb(null, job);
                });
            },
        function(cb) {
            User.findById(user)
                .populate('jobs_saved')
                .exec(function(err, full_user){
                   if (err) return next(err);
                   if (!full_user) return res.send(401);
                   cb(null, full_user);
                });
            }
        ],
        function(err, results){
            var currentJob = results[0];
            var currentUser = results[1];
            if(currentJob.length === 0){
                job.user_ids =[currentUser._id];
                var new_job = new Job(job);
                new_job.save(function(err){
                    if(err){console.log(err)}
                })
                if(currentUser.jobs_saved){
                    currentUser.jobs_saved.push(new_job._id)
                    currentUser.save(function(err){
                        if(err){console.log(err);}
                    })
                }
                else{
                    currentUser.jobs_saved = [new_job._id];
                    currentUser.save(function(err){
                        if(err){console.log(err);}
                    })
                }
            }
            else{
                console.log(currentJob);
                var thisJob = currentJob[0]
                if(thisJob.user_ids){
                    if(thisJob.user_ids.indexOf(currentUser._id) === -1){
                        thisJob.user_ids.push(currentUser._id)
                        thisJob.save(function(err){
                         if(err){console.log(err);}
                        })
                    }
                } 
                else if(!thisJob.user_ids){
                    thisJob.user_ids = [currentUser._id];
                    thisJob.save(function(err){
                         if(err){console.log(err);}
                    })
                }
                if(currentUser.jobs_saved){
                    if(currentUser.jobs_saved.indexOf(thisJob._id)===-1){
                        currentUser.jobs_saved.push(thisJob._id)
                        currentUser.save(function(err){
                            if(err){console.log(err);}
                        })
                    }
                }
                else if(!currentUser.jobs_saved){
                    currentUser.jobs_saved = [thisJob._id];
                    currentUser.save(function(err){
                        if(err){console.log(err);}
                    })
                }

            }
        }
    )
};

exports.jobShow = function(req, res) {
    Job.find({
        _id: req.params.id
    })
        .populate('user_ids')
        .exec(function(err, job) {
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
exports.editRecruiterJob = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Job.findById(req.params.id, function(err, job) {
        if (err) {
            return handleError(res, err);
        }
        if (!job) {
            return res.send(404);
        }
        var updated = _.merge(job, req.body);
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
        var indeedId = item.jobkey
        request.get({
            url: url
        }, function(err, response) {
            if(err){cb([{jobtitle: "No More Jobs", company:"Jobsies", snippet: "There are no more results for the current criteria. Please change your search preferences to a different job title or skill.                                                                                "}]);}
                else{
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
                    if (logo === undefined){
                        logo = 'http://www.forexfactory.com/attachment.php?attachmentid=1557296&stc=1&thumb=1&d=1416835200'
                    }
                var new_stuff = {
                    logo: logo,
                    summary: summary,
                    contact_information: contact_information
                };
                var updated = _.merge(item, new_stuff);
                cb(err, updated);
            }
        })
    }
    async.map(req, cheerioStuff, function(err, results) {
        res.send(results)
    })
}

function handleError(res, err) {
    return res.send(500, err);
}