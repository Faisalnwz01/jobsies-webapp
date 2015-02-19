'use strict';

angular.module('jobsiesApp')
  .factory('jobs', function ($http, Auth) {

    return {
      getJobs: function (jobPosting) {
        return $http.get('/api/jobs/' + jobPosting + '/showJobs').success(function(job) {
          return job[0]
        });
      },
      postJobs: function (userId, newJob) {
        return $http.post('/api/jobs/', newJob).then(function(jobs) {
                var jobs_id = jobs._id
                $http.post('/api/users/' + userId + '/jobPost', { job_postings: jobs_id})
                return jobs
                });
      }

    };
  });
