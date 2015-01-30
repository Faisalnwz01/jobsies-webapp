'use strict';

angular.module('jobsiesApp')
  .controller('ResumeEditCtrl', function ($scope, User) {
    $scope.user = User.get().$promise.then(function(user) {
      $scope.profileInformation = user
console.log($scope.profileInformation)

    })
$scope.update = function(){
console.log($scope.profileInformation, 'this is profileInformation')
  console.log(User.save($scope.profileInformation))
}

    // console.log(User.save())
  });
