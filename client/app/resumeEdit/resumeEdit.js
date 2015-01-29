'use strict';

angular.module('jobsiesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('resumeEdit', {
        url: '/resumeEdit',
        templateUrl: 'app/resumeEdit/resumeEdit.html',
        controller: 'ResumeEditCtrl'
      });
  });