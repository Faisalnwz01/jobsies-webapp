'use strict';

angular.module('jobsiesApp')
    .factory('SaveJobs', function($http, Auth) {
        return {
            postJobs: function(jobs) {
                var user = Auth.getCurrentUser();
                //when a user likes a job search the database for the job
                $http.get('/api/jobs/' + jobs.jobkey).then(function(job) {
                    //if the job does not exist add the current users id to the job and post it to the database
                    if (job.data.length === 0) {
                        jobs['user_ids'] = [user._id]
                        $http.post('/api/jobs', jobs).then(function(new_job) {
                            // add the job id to the users schema
                            $http.put('/api/users/' + user._id, {
                                jobs_saved: new_job.data._id
                            })
                        });
                    } else {
                        // else if the job does exist, 
                        //if the user id isn't saved to the job update the job
                        if (job.data[0].user_ids.indexOf(user._id) === -1) {
                            job.data[0].user_ids.push(user._id);
                            $http.put('/api/jobs/' + jobs.jobkey, job.data[0])
                        }
                        //if the job is not in the user's jobs_saved add it.
                        console.log(job)
                        console.log(user.jobs_saved)
                        if (user.jobs_saved.indexOf(job._id) === -1) {
                            $http.put('/api/users/' + user._id, {jobs_saved: job._id})
                        }
                    }
                })
            },
            populateJobs: function() {
                return $http.get('/api/users/me')
            }
        }
    });