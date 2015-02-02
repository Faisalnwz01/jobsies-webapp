'use strict';

angular.module('jobsiesApp')
  .controller('RusersavedCtrl', function ($scope, $http, User) {
	$scope.user = User.get().$promise.then(function(user) {
               $scope.profileInformation = user
             $scope.users_saved = $scope.profileInformation.users_saved
           })

  });
