'use strict';

angular.module('jobsiesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('rusersaved', {
        url: '/rusersaved',
        templateUrl: 'app/rusersaved/rusersaved.html',
        controller: 'RusersavedCtrl'
      });
  });