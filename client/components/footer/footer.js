'use strict';

angular.module('jobsiesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('footer', {
        url: '/footer',
        templateUrl: 'app/footer/footer.html',
        controller: 'FooterCtrl'
      });
  });