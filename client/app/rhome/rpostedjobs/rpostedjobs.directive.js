'use strict';

angular.module('jobsiesApp')
  .directive('rpostedjobs', function () {
    return {
      templateUrl: 'app/rhome/rpostedjobs/rpostedjobs.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });