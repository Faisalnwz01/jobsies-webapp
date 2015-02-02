'use strict';

angular.module('jobsiesApp')
  .controller('JobpostCtrl', function ($scope, $http, Auth) {
  	$scope.userID = Auth.getCurrentUser()._id;

  	$scope.postJob = function(job) {
  	console.log("step1")
    $scope.jobs = angular.copy(job);
    $scope.jobs.recruiter_id = $scope.userID;
    console.log($scope.jobs)
      $http.post('/api/jobs/', $scope.jobs).success(function(jobs){
        console.log("JOB DONE", jobs);
        var jobs_id = jobs._id
            $http.post('/api/users/'+Auth.getCurrentUser()._id+'/jobPost',{job_postings: jobs_id}).success(function(data) {
    			console.log(data);
    	});
      });
     }

  });
