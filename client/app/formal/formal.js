'use strict';

angular.module('jobsiesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('formal', {
        url: '/formal/:id',
        templateUrl: 'app/formal/formal.html',
        controller: 'FormalCtrl'
      });
  });