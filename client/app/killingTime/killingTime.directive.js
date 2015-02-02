'use strict';

angular.module('jobsiesApp')
  .directive('killingTime', function () {
    return {
      templateUrl: 'app/killingTime/killingTime.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });