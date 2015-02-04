'use strict';

angular.module('jobsiesApp')
    .factory('SaveJobs', function($http, Auth, $q) {

        return {
            postJobs: function(jobs) {
                var user = Auth.getCurrentUser();

                $http.get('/api/jobs/' + jobs.jobkey).then(function(data) {
                    if (data.data.length === 0) {

                        jobs['user_ids'] = user._id
                        $http.post('/api/jobs', jobs).then(function(data) {
                            return;
                        })
                    } else {
                      console.log(data.data[0].user_ids.indexOf(user._id) === -1)
                        if (data.data[0].user_ids.indexOf(user._id) === -1) {
                            data.data[0].user_ids.push(user._id);
                            $http.put('/api/jobs/' + jobs.jobkey, data.data[0]).then(function(data) {
                                return;
                            })
                        }
                    }
                })
                if(user.jobs_saved.indexOf(jobs.jobkey)===-1){
                  console.log(user.jobs_saved, "user jobs saved")
                  console.log("jobkey", jobs.jobkey)
                  $http.put('/api/users/'+user._id, {jobs_saved: jobs})
                }
            },
           populateJobs: function() {
             return new $q(function(resolve, reject) {
            $http.get('/api/users/me').success(function(data){
                resolve(data.jobs_saved);
             })
          })
          }
        };
    });