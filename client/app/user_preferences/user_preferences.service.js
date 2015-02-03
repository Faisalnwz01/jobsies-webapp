'use strict';

angular.module('jobsiesApp')
  .factory('userPreferences', function ($http) {
    return {
      savePreferences: function (user) {
        $http.put('/api/users/preferences/'+user._id, user)
      }
    };
  });
