'use strict';

angular.module('jobsiesApp')
  .factory('userPreferences', function ($http) {
    return {
      savePreferences: function (user, items) {
        $http.put('/api/users/preferences/'+user._id, items)
      }
    };
  });
