'use strict';

angular.module('jobsiesApp')
  .controller('RsignupCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          role: 'recruiter',
          company: $scope.user.company
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/rhome');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          console.log("hmm")
          $location.path('/rhome');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    $scope.rsignup = false;

    $scope.rsignupfunk = function() {
      if ($scope.rsignup === false) {
      $scope.rlogin = false;
      $scope.rsignup = true;
      }
      else {
      $scope.rsignup = false;
      }
    }

    $scope.rlogin = false;

    $scope.rloginfunk = function() {
      if ($scope.rlogin === false) {
      $scope.rsignup = false;
      $scope.rlogin = true;
      }
      else {
      $scope.rlogin = false;
      }
    }
  });
