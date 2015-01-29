'use strict';

angular.module('jobsiesApp')
  .controller('MainCtrl', function ($scope, Auth, $http, socket, $location, $window) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
$scope.loginOauth =function (provider) {
  $window.location.href ='/auth/' + provider;

}
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
