'use strict';

angular.module('jobsiesApp')
  .directive('recruiterhome', function () {
    return {
      templateUrl: 'app/recruiterhome/recruiterhome.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });