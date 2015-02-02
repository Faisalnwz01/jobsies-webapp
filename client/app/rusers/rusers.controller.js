'use strict';

angular.module('jobsiesApp')
  .controller('RusersCtrl', function ($scope, $http, Auth) {

    $scope.currentUser = 0;
    $scope.userSeen = 0;

    $http.get('/api/users/').success(function(users){
      $scope.users = users;
      console.log($scope.users)
    })

    $scope.savedUser = function(user){
   	console.log(user);
    $scope.currentUser += 1;
    $scope.userSeen += 1;
    $http.post('/api/users/'+Auth.getCurrentUser()._id+'/savedUser',{users_saved: user}).success(function(data) {
    	console.log(data);
    });
   }
  });
