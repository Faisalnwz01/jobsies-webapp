'use strict';

angular.module('jobsiesApp')
  .directive('cover', function () {
    return {
      templateUrl: 'app/cover/cover.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });