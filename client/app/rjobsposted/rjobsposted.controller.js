'use strict';

angular.module('jobsiesApp')
  .controller('RjobspostedCtrl', function ($scope, User, $http) {
  	$scope.recruiter = {};
  	$scope.jobs = [];

	$scope.user = User.get().$promise.then(function(user) {
           $scope.profileInformation = user
         $scope.recruiter.job_postings = $scope.profileInformation.job_postings
         console.log($scope.recruiter.job_postings)
         for (var i=0; i<$scope.recruiter.job_postings.length; i++) {        
         	$http.get('/api/jobs/'+$scope.recruiter.job_postings[i]+'/').success(function(data) {
    	console.log(data);
    		$scope.jobs.push(data);
		});
    }

       })
  });
