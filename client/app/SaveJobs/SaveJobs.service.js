'use strict';

angular.module('jobsiesApp')
    .factory('SaveJobs', function($http, Auth) {
        return {
            postJobs: function(jobs) {
                var userId = Auth.getCurrentUser()._id;
                //when a user likes a job search the database for the job
                $http.put('/api/jobs/saveJobs/' + jobs.jobkey, {job:jobs, user:userId}).then(function() {
                    //if the job does not exist add the current users id to the job and post it to the database
                    console.log("save jobs")
                    // if (job.data.length === 0) {
                    //     jobs['user_ids'] = [user._id]
                    //     $http.post('/api/jobs', jobs).then(function(new_job) {
                    //         // add the job id to the users schema
                    //         $http.put('/api/users/' + user._id, {
                    //             jobs_saved: [new_job.data._id]
                    //         })
                    //     });
                    // } else {
                    //     var jobFromDb = job.data[0];
                    //     // else if the job does exist, 
                    //     //if the user id isn't saved to the job update the job
                    //     if (jobFromDb.user_ids.indexOf(user._id) === -1) {
                    //         jobFromDb.user_ids.push(user._id);
                    //         $http.put('/api/jobs/' + jobs.jobkey, job.data[0])
                    //     }
                    //     //if the job is not in the user's jobs_saved add it.
                    //     if (user.jobs_saved.indexOf(jobFromDb._id) === -1) {
                    //         $http.put('/api/users/' + user._id, {
                    //             jobs_saved: jobFromDb._id
                    //         })
                    //     }
                    // }
                })
            },
            populateJobs: function() {
                var user = Auth.getCurrentUser();
                return $http.get('/api/users/' + user._id + '/jobPopulate')
            },
            removeJobFromUser: function(job, user) {
                return $http.put('/api/users/' + user._id + '/removeJob/' + job._id)
            },
            getRecruiterJobs: function() {
                return $http.get('/api/jobs/')
            },
            saveRecruiterJobs: function(job) {
                var user = Auth.getCurrentUser();
                $http.get('/api/jobs/recruiterJobs/' + job._id).then(function(newJob) {
                    var recruiterJob = newJob.data[0];
                    console.log(recruiterJob, "recruiter job")
                    if (recruiterJob.user_ids.indexOf(user._id) === -1) {
                        recruiterJob.user_ids.push(user._id);
                        if (recruiterJob.numLikes) {
                            recruiterJob.numLikes += 1;
                        } else {
                            recruiterJob.numLikes = 1
                        }
                        $http.put('/api/jobs/updateRecruiterJob/' + recruiterJob._id, recruiterJob)
                    }
                    //if the job is not in the user's jobs_saved add it.
                    if (user.jobs_saved.indexOf(recruiterJob._id) === -1) {
                        $http.put('/api/users/' + user._id, {
                            jobs_saved: recruiterJob._id
                        })
                    }
                })
            }
        }
    });