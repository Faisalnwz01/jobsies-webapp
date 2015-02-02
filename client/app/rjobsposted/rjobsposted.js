'use strict';

angular.module('jobsiesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('rjobsposted', {
        url: '/rjobsposted',
        templateUrl: 'app/rjobsposted/rjobsposted.html',
        controller: 'RjobspostedCtrl'
      });
  });