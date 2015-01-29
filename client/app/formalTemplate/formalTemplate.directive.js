'use strict';

angular.module('jobsiesApp')
  .directive('formalTemplate', function () {
    return {
      templateUrl: 'app/formalTemplate/formalTemplate.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });