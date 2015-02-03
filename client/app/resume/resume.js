'use strict';

angular.module('jobsiesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('resume', {
        url: '/resume',
        templateUrl: 'app/resume/resume.html',
        controller: 'ResumeCtrl', 
             resolve: {
        	       // User: 'User',
        	       user: function(User){
        	       	return User.get().$promise; 
        	       }
        }
      });
  });