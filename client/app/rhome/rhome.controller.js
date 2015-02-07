'use strict';

angular.module('jobsiesApp')
    .controller('RhomeCtrl', function($scope, User, $http, Auth, $mdSidenav, $log) {
        $scope.recruiter = {};

        $scope.user = User.get().$promise.then(function(user) {
            $scope.profileInformation = user
            $scope.recruiter.job_postings = $scope.profileInformation.job_postings
            console.log($scope.recruiter.job_postings)
            for (var i = 0; i < $scope.recruiter.job_postings.length; i++) {
                $scope.jobs = [];
                $http.get('/api/jobs/' + $scope.recruiter.job_postings[i] + '/showJobs').success(function(data) {
                    console.log(data)
                    $scope.jobs.push(data[0])
                    console.log($scope.jobs);
                });
            }
        });

        $scope.currentUser = 0;
        $scope.userSeen = 0;
        $scope.currentJob = 0;

        $http.get('/api/users/').success(function(users) {
            $scope.users = users;
            console.log($scope.users)
        })

        $scope.savedUser = function(user) {
            console.log(user);
            $scope.currentUser += 1;
            $scope.userSeen += 1;
            $http.post('/api/users/' + Auth.getCurrentUser()._id + '/savedUser', {
                users_saved: user
            }).success(function(data) {
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

        $scope.showPostedJob = false;
        $scope.showPosition = function(index) {
            $scope.showPostedJob = true;
            $scope.currentJob = index;
        }

        $scope.showjobs = false;

        $scope.showJobPost = function() {
            if ($scope.showjobs === false) {
                $scope.showusers = false;
                $scope.showjobs = true;
            } else {
                $scope.showjobs = false;
            }
        }

        $scope.showusers = false;

        $scope.showUsers = function() {
            if ($scope.showusers === false) {
                $scope.showjobs = false;
                $scope.showusers = true;
            } else {
                $scope.showusers = false;
            }
        }
        $scope.postJob = function(job) {
            console.log("step1")
            $scope.job = angular.copy(job);
            $scope.job.recruiter_id = Auth.getCurrentUser()._id;
            $scope.job.date = new Date();
            console.log($scope.job)
                // $scope.jobs.push($scope.job)
            $http.post('/api/jobs/', $scope.job).success(function(jobs) {
                console.log("JOB DONE", jobs);
                var jobs_id = jobs._id
                $http.post('/api/users/' + Auth.getCurrentUser()._id + '/jobPost', {
                    job_postings: jobs_id
                }).success(function(data) {
                    console.log(data);
                    $scope.formReset();
                });
            });
        }
        $scope.formReset = function() {
            $scope.job.jobtitle = '';
            $scope.job.formattedLocation = '';
            $scope.job.company = '';
            $scope.job.snippet = '';
            $scope.job.qualifications = '';
            $scope.showjobs = false;
        }

        $scope.discardForm = function() {
            $scope.job.jobtitle = '';
            $scope.job.formattedLocation = '';
            $scope.job.company = '';
            $scope.job.snippet = '';
            $scope.job.qualifications = '';
            $scope.showjobs = false;
        }

        $scope.toggleLeft = function() {
            $mdSidenav('left').toggle()
                .then(function() {
                    $log.debug("toggle left is done");
                });
        };
        $scope.toggleRight = function() {

            $mdSidenav('right').toggle()
                .then(function() {
                    $log.debug("toggle RIGHT is done");
                });
        };

        $scope.showCard = false;

        $scope.checkOutUser = function(user, job) {
            $scope.cardUser = user;
            $scope.cardJob = job;
            $scope.showCard = true;
        }

        $scope.saveCandidate = function(cardUser, cardJob) {
            //cardJob.users_saved.push(cardUser._id)
            var cardUserId = cardUser._id;
            cardJob.users_saved.push(cardUserId)
            $http.put('api/jobs/updateRecruiterJob/' + cardJob._id, {users_saved: cardUserId});
        }


    })
    .controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function() {
            $mdSidenav('left').close()
                .then(function() {
                    $log.debug("close LEFT is done");
                });
        };
    })
    .controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function() {
            $mdSidenav('right').close()
                .then(function() {
                    $log.debug("close RIGHT is done");
                });
        };

 $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  });
});