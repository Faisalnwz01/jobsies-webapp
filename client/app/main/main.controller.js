'use strict';

angular.module('jobsiesApp')
    .controller('MainCtrl', function($scope, $http, socket, SaveJobs, $timeout, User, $mdSidenav, $log, indeedapi, Auth, userPreferences) {
        // $scope.$on('$destroy', function () {
        //   socket.unsyncUpdates('thing');
        // });

        $scope.currentJob = 0;
        $scope.page = 0;
        $scope.totalResults;
        $scope.jobsSeen = 0;

        // The user can changes the type of job they are looking for and/or location preferences.
        // these preferences are saved to the database and display new jobs results.
        $scope.updateJob = function(headline, location) {
            $scope.searchDone = false;
            $scope.user.jobUserLookingFor = headline;
            $scope.user.locationUserWantsToWorkIn = location;
            userPreferences.savePreferences($scope.user);
            $scope.getRecruiterJobs($scope.user.jobUserLookingFor, $scope.user.locationUserWantsToWorkIn);

            

            // var getJobs = indeedapi.getIndeedJobs(headline, location, 0)
            // getJobs.then(function(jobs) {
            //     $scope.jobArray = jobs.jobArray;
            //     $scope.totalResults = jobs.totalResults;
            //     userPreferences.savePreferences($scope.user)
            // })
        }

        $scope.user = Auth.getCurrentUser();

        //this autocompletes the location search input with US cities
        $scope.options = {
            country: 'us',
            types: '(cities)'
        }
        // automatically fills in the job the user is searching for and location
        //based on linkedin profile or updated preferences.
        $scope.userHeadline = $scope.user.jobUserLookingFor || $scope.user.linkedin.positions.values[0].title;
        $scope.locationCutter = function() {
            $scope.jobLocation = $scope.user.locationUserWantsToWorkIn || $scope.user.linkedin.location.name
            if ($scope.jobLocation.toLowerCase().search('greater') !== -1) {
                $scope.jobLocation = $scope.user.linkedin.location.name.toLowerCase().replace('greater', '')
                $scope.jobLocation = $scope.jobLocation.replace('area', '')
            }
        }
        $scope.locationCutter();

        //gets  jobs from the indeed api to display on the home page.
        var getJobs = indeedapi.getIndeedJobs($scope.userHeadline, $scope.jobLocation, 0)

        $scope.getRecruiterJobs = function(userHeadline, jobLocation) {
            SaveJobs.getRecruiterJobs().then(function(jobs) {
                var allJobsies = jobs.data;
                var jobsies = allJobsies.filter(function(element) {
                    if (element.recruiter_id && element.formattedLocationFull == jobLocation && element.snippet.search(userHeadline)>-1) {
                        return element
                    }
                })
                $scope.numberOfRecruiterJobs = jobsies.length;
                $scope.jobArray = jobsies;
                if($scope.jobArray.length == 0){
                     getJobs.then(function(jobs) {
                            $scope.currentJob = 0;
                            console.log("hit indded api", jobs);
                            $scope.jobArray = jobs.jobArray;
                            $scope.totalResults = jobs.totalResults;
                        })
                }
            })
        }
        $scope.getRecruiterJobs($scope.userHeadline, $scope.jobLocation);

        //fills in the right sidebar with jobs that a user has previously saved
        $scope.getSavedJobsies = function() {
            SaveJobs.populateJobs().then(function(jobs) {
                $scope.savedJobsFrontPage = jobs.data.jobs_saved || [];
            })
        }


        //save jobs to the database, also call indeed for more results
        // after a user has gone through 25 jobs
        $scope.saveOrPass = function(status, job) {
            $scope.currentJob += 1;
            if (job.recruiter_id != undefined) {
                if ($scope.numberOfRecruiterJobs >= 1) {
                    if (status == 'save') {
                        toast('Job Saved!! :)', 3000)
                        SaveJobs.saveRecruiterJobs(job)
                        setTimeout(function() {
                            $scope.getSavedJobsies();
                        }, 1000)
                    } else if (status == 'pass') {
                        toast('Job Passed :(', 3000)
                    }
                    if ($scope.numberOfRecruiterJobs == 1) {
                        getJobs.then(function(jobs) {
                            $scope.currentJob = 0;
                            console.log("hit indded api", jobs);
                            $scope.jobArray = jobs.jobArray;
                            $scope.totalResults = jobs.totalResults;
                        })
                    }
                    $scope.numberOfRecruiterJobs -= 1;
                }
            } else {
                $scope.currentJob += 1;
                $scope.jobsSeen += 1;
                if ($scope.jobsSeen == $scope.totalResults) {
                    $scope.searchDone = true;
                }
                if ($scope.currentJob === 25) {
                    if ($scope.jobsSeen < $scope.totalResults) {
                        $scope.page += 1;
                        $scope.currentJob = 0;
                        indeedapi.getIndeedJobs($scope.jobTitle, $scope.city, 25 * $scope.page);
                    }
                }
                if (status == 'save') {
                    toast('Job Saved!! :)', 3000)
                    SaveJobs.postJobs(job)
                    setTimeout(function() {
                        $scope.getSavedJobsies();
                    }, 1000)
                }
                if (status == 'pass') {
                    toast('Job Passed :(', 3000)
                }
            }
        }

        $scope.removeJobFromUser = function(job) {
            SaveJobs.removeJobFromUser(job, $scope.user).then(function() {
                $scope.getSavedJobsies();
            })
        }

        $scope.toggleLeft = function() {
            $mdSidenav('left').toggle()
                .then(function() {
                    $log.debug("toggle left is done");
                });
        };
        $scope.toggleRight = function() {
            $scope.getSavedJobsies();
            $mdSidenav('right').toggle()
                .then(function() {
                    $log.debug("toggle RIGHT is done");
                });
        };


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



    });