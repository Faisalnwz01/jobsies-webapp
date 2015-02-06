'use strict';

angular.module('jobsiesApp')
  .controller('ResumeCtrl', function($scope, User,  $q, $interpolate, user, $state, SaveJobs) {
    $scope.profileInformation = user
 SaveJobs.populateJobs().then(function(jobs) {
                $scope.jobs_saved = jobs.data.jobs_saved;
                console.log($scope.jobs_saved)
            })


 $scope.clicked = false; 



    $scope.goToStep1 = function(){
      $state.go('resume')
    }
    
    $scope.goToStep2 = function(){
      $state.go('cover')
    }

    $scope.goToStep3 = function(){
      $state.go('edit')
    }


    $scope.getCoverLetterJob = function(job){
    
      $scope.coverLetterJob = job 

    }

    $scope.saveCoverLetter = function(title){

     
     var text = $('textarea#mytextarea').val()
    

      var cL = { 
                title: title, 
                text: text
                  }
    
     $scope.profileInformation.cover_letter.push(cL)

     User.save($scope.profileInformation)
     toast('Cover Letter Saved!! :)', 4000 )


    }



$scope.date = new Date().getFullYear()



    if (!$scope.profileInformation.linkedin.template){
      $scope.profileInformation.linkedin.template = 'none'
    }

    if ($scope.profileInformation.linkedin.ShowCoverLetter === undefined) {
      $scope.profileInformation.linkedin.ShowCoverLetter = false;
      User.save($scope.profileInformation)
    }



    $scope.filter = function() {
      if ($scope.profileInformation.linkedin.ShowCoverLetter === false) {
        $scope.profileInformation.linkedin.ShowCoverLetter = true;
      } else {
        $scope.profileInformation.linkedin.ShowCoverLetter = false
      }
      User.save($scope.profileInformation)
    }

 $scope.viewLetters = false;
      $scope.viewCoverLetters = function() {
      if ($scope.viewLetters === false) {
        $scope.viewLetters = true;
      } else {
        $scope.viewLetters = false
      }
    }

$scope.coverLetterYesOrNo = function(answer){
  if(answer ==='yes'){
    $scope.profileInformation.linkedin.ShowCoverLetter = true; 
  }
  else{
    $scope.profileInformation.linkedin.ShowCoverLetter = false; 
  }
  User.save($scope.profileInformation)
}

    $scope.image = {
      formal: true,
      fancy: false
    };


    $scope.show = function(type) {
      $scope.clicked = true; 

      for (var property in $scope.image) {
        $scope.image[property] = false;
      }
      $scope.image[type] = true;
      $scope.profileInformation.linkedin.template = type
      User.save($scope.profileInformation)
    }



  });