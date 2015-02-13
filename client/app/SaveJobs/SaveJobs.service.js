'use strict';

angular.module('jobsiesApp')
    .factory('SaveJobs', function($http, Auth) {
        return {
            postJobs: function(jobs) {
                var userId = Auth.getCurrentUser()._id;
                //when a user likes a job search the database for the job
                return $http.put('/api/jobs/saveJobs/' + jobs.jobkey, {job:jobs, user:userId})
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