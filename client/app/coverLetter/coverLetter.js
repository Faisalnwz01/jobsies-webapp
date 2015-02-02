'use strict';

angular.module('jobsiesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('coverLetter', {
        url: '/coverletter',
        templateUrl: 'app/coverLetter/coverLetter.html',
        controller: 'CoverLetterCtrl', 
        resolve: {
        	       // User: 'User',
        	       user: function(User){
        	       	return User.get().$promise; 
        	       }
        }
      });
  });