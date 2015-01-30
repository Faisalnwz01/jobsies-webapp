'use strict';

angular.module('jobsiesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('jobpost', {
        url: '/jobpost',
        templateUrl: 'app/jobpost/jobpost.html',
        controller: 'JobpostCtrl'
      });
  });