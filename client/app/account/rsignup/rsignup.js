'use strict';

angular.module('jobsiesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('rsignup', {
        url: '/rsignup',
        templateUrl: 'app/account/rsignup/rsignup.html',
        controller: 'RsignupCtrl'
      });
  });