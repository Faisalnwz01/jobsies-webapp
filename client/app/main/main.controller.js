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
        $scope.getJobs = function(headline, location) {
            indeedapi.getIndeedJobs(headline, location, 0).then(function(jobs) {
                $scope.currentJob = 0;
                $scope.jobArray = jobs.jobArray;
                $scope.totalResults = jobs.totalResults;
            })
        };

        ///find the recruiter jobs in the database that match the user search criteria
        /// if there are none, get the jobs from the indeed api.
        $scope.getRecruiterJobs = function(userHeadline, jobLocation) {
            SaveJobs.getRecruiterJobs().then(function(jobs) {
                var allJobsies = jobs.data;
                var jobsies = allJobsies.filter(function(element) {
                    if (element.recruiter_id && 
                        jobLocation.toLowerCase().search(element.formattedLocationFull.toLowerCase()) > -1 && 
                        (element.summary.toLowerCase().search(userHeadline.toLowerCase()) > -1 || element.jobtitle.toLowerCase().search(userHeadline.toLowerCase()) > -1)) {
                        return element
                    }
                })
                $scope.numberOfRecruiterJobs = jobsies.length;
                $scope.jobArray = jobsies;
                if ($scope.jobArray.length == 0) {
                    $scope.getJobs(userHeadline, jobLocation)
                }
            })
        };

        $scope.getRecruiterJobs($scope.userHeadline, $scope.jobLocation);

        //fills in the right sidebar with jobs that a user has previously saved
        $scope.getSavedJobsies = function() {
            $scope.savedJobsFrontPage = []
            SaveJobs.populateJobs().then(function(jobs) {
                $scope.savedJobsFrontPage = jobs.data.jobs_saved || [];
            })
        }

//generating cover letter for auto reply to jobs
      $scope.generateCoverLetter = function(index){
        var today = new Date().getFullYear();
        $scope.contact_info_for_job = false; 

        console.log($scope.savedJobsFrontPage[index].contact_information)

            if($scope.savedJobsFrontPage[index].contact_information){
                $scope.contact_info_for_job = true; 
            }

            console.log($scope.contact_info_for_job)
            if($scope.user.jobsought === undefined){
                var field = $scope.user.linkedin.positions.values[0].title
            }
        

        $scope.autoApplyEmail = "To Whom it may Concern, \n\nI read with interest your posting for "+ $scope.savedJobsFrontPage[index].jobtitle+" on indeed.com.\n\nI believe I possess the necessary skills and experience you are seeking\nand would make a valuable addition to " + $scope.savedJobsFrontPage[index].company + "\n\nAs my resume indicates, I possess more than " + (today - $scope.user.linkedin.positions.values[0].startDate.year) + " years of progressive\nexperience in the " + field + " field. \n\n" + "My professional history includes positions such as " + $scope.user.linkedin.positions.values[1].title + " at " + $scope.user.linkedin.positions.values[1].company.name + ",\nas well as" + $scope.user.linkedin.positions.values[2].title + " at " + $scope.user.linkedin.positions.values[2].company.name + "." + "\n\nMost recently, my responsibilities as " + $scope.user.linkedin.positions.values[0].title + " at " + $scope.user.linkedin.positions.values[0].company.name + " match the qualifications you are seeking.\n\nAs the" + $scope.user.linkedin.positions.values[0].title + ", my responsibilities included " + $scope.user.linkedin.positions.values[0].summary + "\n\nMy colleagues also relied on my skills in " + $scope.user.linkedin.skills.values[0].skill.name + ", " + $scope.user.linkedin.skills.values[1].skill.name + ", and " + $scope.user.linkedin.skills.values[2].skill.name + ". \n\nHere is a link to my online resume for your review\n" + "localhost:9000/formal/" + $scope.user._id + "\n\nI look forward to speaking with you further regarding your available position\nand am excited to learn more about " + $scope.savedJobsFrontPage[index].company + "." + "\n\nSincerely, \n" + $scope.user.name; 
        $scope.encodedEmail =  encodeURIComponent($scope.autoApplyEmail)

      }


        //save jobs to the database, also call indeed for more results
        // after a user has gone through 25 jobs
        $scope.saveOrPass = function(status, job) {
            console.log(job.contact_information)
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
                        $scope.getJobs($scope.user.jobUserLookingFor, $scope.user.locationUserWantsToWorkIn);
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
                        indeedapi.getIndeedJobs($scope.user.jobUserLookingFor, $scope.user.locationUserWantsToWorkIn, 25 * $scope.page);
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

        $(document).ready(function() {
            $('.collapsible').collapsible({
                accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
        });

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