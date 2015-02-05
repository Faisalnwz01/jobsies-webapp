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
      })
      .state('cover', {
        url: '/cover',
        template: "<cover></cover>",
        controller: 'ResumeCtrl', 
        resolve: {
                 // User: 'User',
                 user: function(User){
                  return User.get().$promise; 
                 }
               }
      })
      .state('edit', {
        url: '/edit',
        templateUrl: "app/resumeEdit/resumeEdit.html",
         controller: 'ResumeEditCtrl', 
        resolve: {
                 // User: 'User',
                 user: function(User){
                  return User.get().$promise; 
                 }
               }
      })
        .state('publish', {
        url: '/publish',
        templateUrl: "app/resumeEdit/resumeEdit.html",
         controller: 'ResumeEditCtrl', 
        resolve: {
                 // User: 'User',
                 user: function(User){
                  return User.get().$promise; 
                 }
               }
      })
  });