'use strict';

angular.module('jobsiesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('rstats', {
        url: '/rstats',
        templateUrl: 'app/rstats/rstats.html',
        controller: 'RstatsCtrl'
      });
  });