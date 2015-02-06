'use strict';

angular.module('jobsiesApp')
  .directive('rusercard', function () {
    return {
      templateUrl: 'app/rhome/rusercard/rusercard.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });