'use strict';

angular.module('jobsiesApp')
    .controller('RhomeCtrl', function($scope, User, $http, Auth, $mdSidenav, $log, recruiterJobs, users, jobs) {
        $scope.recruiter = {};

        $scope.user = function() {
            User.get().$promise.then(function(user) {
                $scope.profileInformation = user
                $scope.recruiter.job_postings = $scope.profileInformation.job_postings
                console.log($scope.recruiter.job_postings)
                if ($scope.recruiter.job_postings.length > 0) {
                    for (var i = 0; i < $scope.recruiter.job_postings.length; i++) {
                        $scope.jobs = [];
                        var jobPosting = $scope.recruiter.job_postings[i]
                        $scope.jobs.push(jobs.getJobs(jobPosting))
                        // $http.get('/api/jobs/' + $scope.recruiter.job_postings[i] + '/showJobs').success(function(data) {
                        //     console.log(data)
                        //     $scope.jobs.push(data[0])
                        //     console.log($scope.jobs);
                        // });
                    }
                } 
                else {
                    $scope.jobs = [];
                    }
            });
        };
        $scope.user();
        

        $scope.currentUser = 0;
        $scope.userSeen = 0;
        $scope.currentJob = 0;

        // $http.get('/api/users/').success(function(users) {
        //     $scope.users = users;
        //     console.log($scope.users)
        // })

        // $scope.users = users;

        $scope.savedUser = function(user) {
            $scope.currentUser += 1;
            $scope.userSeen += 1;
            // $http.post('/api/users/' + Auth.getCurrentUser()._id + '/savedUser', {
            //     users_saved: user
            // }).success(function(data) {
            //     console.log(data);
            // });
            users.savedUser(user)
        }

        // $scope.saved_users = User.get().$promise.then(function(user) {
        //     $scope.profileInformation = user
        //     console.log($scope.profileInformation)
        //     $scope.users_saved = $scope.profileInformation.users_saved
        //     console.log($scope.users_saved)
        // })
        
        $scope.users_saved = users.savedUsers().then(function(user) {
            return user.users_saved });

        $scope.userID = Auth.getCurrentUser()._id;

        $scope.showPostedJob = false;
        $scope.showPosition = function(index) {
            if ($scope.showPostedJob === false) {
                $scope.showusers = false;
                $scope.showjobs = false;
                $scope.showPostedJob = true;
                $scope.showCard = false;
                $scope.currentJob = index;
            }
            else {
                $scope.showPostedJob = false;
            }

        }

        $scope.showjobs = false;
        $scope.showJobPost = function() {
            if ($scope.showjobs === false) {
                $scope.showusers = false;
                $scope.showPostedJob = false;
                $scope.showCard = false;
                $scope.showjobs = true;
            } else {
                $scope.showjobs = false;
            }
        }

        $scope.showusers = false;
        $scope.showUsers = function() {
            if ($scope.showusers === false) {
                $scope.showjobs = false;
                $scope.showPostedJob = false;
                $scope.showCard = false;
                $scope.showusers = true;
            } else {
                $scope.showusers = false;
            }
        }


        $scope.postJob = function(job) {
            $scope.job = angular.copy(job);
            $scope.job.recruiter_id = Auth.getCurrentUser()._id;
            $scope.job.date = new Date();
            jobs.postJobs(Auth.getCurrentUser()._id, $scope.job).then(function(jobs) {
            $scope.jobs.push(jobs) });
            $scope.formReset();

            // $http.post('/api/jobs/', $scope.job).success(function(jobs) {
            //     console.log("JOB DONE", jobs);
            //     var jobs_id = jobs._id
            //     $scope.jobs.push(jobs)
            //     $http.post('/api/users/' + Auth.getCurrentUser()._id + '/jobPost', {
            //         job_postings: jobs_id
            //     }).success(function(data) {
            //         console.log(data);
            //         $scope.formReset();
            //     });
            // });
        }

        $scope.formReset = function() {
            $scope.job.jobtitle = '';
            $scope.job.formattedLocationFull = '';
            $scope.job.company = '';
            $scope.job.summary ='';
            $scope.job.snippet = '';
            $scope.job.qualifications = '';
            $scope.showjobs = false;
        }

        $scope.discardForm = function() {
            $scope.job.jobtitle = '';
            $scope.job.formattedLocationFull = '';
            $scope.job.company = '';
            $scope.job.snippet = '';
            $scope.job.summary ='';
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
            if ($scope.showCard === false) {
                $scope.showPostedJob = false;
                $scope.showjobs = false;
                $scope.cardUser = user;
                $scope.cardJob = job;
                $scope.showCard = true;  
            }
            else {
                $scope.showCard = false;
            }
        }

      $scope.edit = function(job) {
            console.log("wtf1");
          $http.put('/api/jobs/editRecruiterJob/' + job._id, job).success(function(job) {
            console.log("wtf",job)
          });
        };
      $scope.deleteJob = function(job, index) {
            console.log(index)
            $scope.jobs.slice(index, 1);
            if ($scope.jobs.length<0) {
                $scope.jobs = '';
            }
        $http.delete('/api/jobs/' + job._id).success(function() {
            console.log("deleted")
            $scope.showPostedJob = false;
        })
      }

        $scope.saveCandidate = function(cardUser, cardJob) {
            //cardJob.users_saved.push(cardUser._id)
            var cardUserId = cardUser._id;
            cardJob.users_saved.push(cardUserId)
            $http.put('api/jobs/updateRecruiterJob/' + cardJob._id, {users_saved: cardUserId});
            $scope.showCard = false;
        }

        $scope.removeUser = function(user, job){
            recruiterJobs.removeUser(user, job).then(function(){
                $scope.showCard = false;
                $scope.user();
            })
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