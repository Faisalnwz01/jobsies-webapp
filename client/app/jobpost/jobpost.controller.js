'use strict';

angular.module('jobsiesApp')
  .controller('JobpostCtrl', function ($scope, $http) {

  	$scope.postJob = function(job) {
  	console.log("step1")
    $scope.jobs = angular.copy(job);
      $http.post('/api/jobs/', $scope.jobs).success(function(jobs){
        console.log("JOB DONE", jobs);
      });
     }

  });
