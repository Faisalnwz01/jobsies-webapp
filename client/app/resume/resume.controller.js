'use strict';

angular.module('jobsiesApp')
  .controller('ResumeCtrl', function ($scope, User, $q) {
    $scope.user = User.get().$promise.then(function(user) {
      $scope.profileInformation = user
console.log($scope.profileInformation)
    })

    $scope.image = {
      formal: true,
      fancy: false
    };


$scope.show = function(type){
  // $scope.showformal = true;
  for (var property in $scope.image) {
    $scope.image[property] = false;
  }
  $scope.image[type] = true;
}



  });
