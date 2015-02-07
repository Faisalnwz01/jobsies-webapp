'use strict';

angular.module('jobsiesApp')
  .factory('recruiterJobs', function ($http) {
    return {
      removeUser: function (user, job) {
        return $http.put('/api/jobs/' + job._id + '/removeUser/' + user._id)
      }
    };
  });
