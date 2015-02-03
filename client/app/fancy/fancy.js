'use strict';

angular.module('jobsiesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('fancy', {
        url: '/fancy/:id',
        templateUrl: 'app/fancy/fancy.html',
        controller: 'FancyCtrl'
      });
  });