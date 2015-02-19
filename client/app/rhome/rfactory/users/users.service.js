'use strict';

angular.module('jobsiesApp')
  .factory('users', function ($http, User) {
    return {
      users: function () {
        return $http.get('/api/users/').success(function(users) {
            return users
        });
      },
      savedUser: function (user) {
        return $http.post('/api/users/' + Auth.getCurrentUser()._id + '/savedUser', { users_saved: user});
      },
      savedUsers: function () {
        return User.get().$promise.then(function(user) {
            return user
          });
      }

    };
  });
