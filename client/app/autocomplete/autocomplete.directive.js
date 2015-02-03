'use strict';

angular.module('jobsiesApp')
  .directive('autocomplete', function () {
    return {
      template: '<div></div>',
      controller: 'autoController'
      restrict: 'EA',
      link: function (scope, element, attrs) {
        element.text('this is the autocomplete directive');
      }
    };
  });