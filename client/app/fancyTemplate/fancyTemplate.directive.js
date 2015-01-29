'use strict';

angular.module('jobsiesApp')
  .directive('fancyTemplate', function () {
    return {
      templateUrl: 'app/fancyTemplate/fancyTemplate.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });