'use strict';

angular.module('jobsiesApp')
    .factory('SaveJobs', function($http, Auth) {

        return {
            postJobs: function(jobs) {
                console.log(jobs);
                var user = Auth.getCurrentUser();

                $http.get('/api/jobs/' + jobs.jobkey).then(function(data) {
                    if (data.data.length === 0) {

                        jobs['user_ids'] = user._id
                        $http.post('/api/jobs', jobs).then(function(data) {
                            console.log(data)
                        })
                    } else {
                      console.log(data.data[0].user_ids.indexOf(user._id) === -1)
                        if (data.data[0].user_ids.indexOf(user._id) === -1) {
                            data.data[0].user_ids.push(user._id);
                            $http.put('/api/jobs/' + jobs.jobkey, data.data[0]).then(function(data) {
                                console.log(data);
                            })
                        }
                    }
                })
                console.log(user)
                if(user.jobs_saved.indexOf(jobs.jobkey)===-1){
                  $http.put('/api/users/'+user._id, {jobs_saved: jobs.jobkey})
                }
            }
        };
    });