'use strict';

angular.module('jobsiesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('rhome', {
        url: '/rhome',
        templateUrl: 'app/rhome/rhome.html',
        controller: 'RhomeCtrl'
      });
  });