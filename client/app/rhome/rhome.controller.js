'use strict';

angular.module('jobsiesApp')
  .controller('RhomeCtrl', function ($scope, User, $http, Auth) {
    $scope.recruiter = {};

    $scope.user = User.get().$promise.then(function(user) {
        $scope.profileInformation = user
        $scope.recruiter.job_postings = $scope.profileInformation.job_postings
        console.log($scope.recruiter.job_postings)
        for (var i = 0; i < $scope.recruiter.job_postings.length; i++) {
              $scope.jobs = [];
            $http.get('/api/jobs/' + $scope.recruiter.job_postings[i] + '/').success(function(data) {
                $scope.jobs.push(data[0]);
            });
        }
    });

    $scope.currentUser = 0;
    $scope.userSeen = 0;

    $http.get('/api/users/').success(function(users){
      $scope.users = users;
      console.log($scope.users)
    })

    $scope.savedUser = function(user){
    console.log(user);
    $scope.currentUser += 1;
    $scope.userSeen += 1;
    $http.post('/api/users/'+Auth.getCurrentUser()._id+'/savedUser',{users_saved: user}).success(function(data) {
      console.log(data);
    });
   }

    $scope.saved_users = User.get().$promise.then(function(user) {
       $scope.profileInformation = user
       console.log($scope.profileInformation)
     $scope.users_saved = $scope.profileInformation.users_saved
     console.log($scope.users_saved)
   })

    $scope.userID = Auth.getCurrentUser()._id;

    $scope.postJob = function(job) {
    console.log("step1")
    $scope.job = angular.copy(job);
    $scope.job.recruiter_id = $scope.userID;
    console.log($scope.job)
    $scope.jobs.push($scope.job)
      $http.post('/api/jobs/', $scope.job).success(function(jobs){
        console.log("JOB DONE", jobs);
        var jobs_id = jobs._id
            $http.post('/api/users/'+Auth.getCurrentUser()._id+'/jobPost',{job_postings: jobs_id}).success(function(data) {
          console.log(data);
      });
      });
     }

  })
