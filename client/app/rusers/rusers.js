'use strict';

angular.module('jobsiesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('rusers', {
        url: '/rusers',
        templateUrl: 'app/rusers/rusers.html',
        controller: 'RusersCtrl'
      });
  });