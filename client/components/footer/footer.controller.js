'use strict';

angular.module('jobsiesApp')
  .controller('FooterCtrl', function ($scope, $location) {
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
