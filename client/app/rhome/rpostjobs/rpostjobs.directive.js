'use strict';

angular.module('jobsiesApp')
  .directive('rpostjobs', function () {
    return {
      templateUrl: 'app/rhome/rpostjobs/rpostjobs.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });