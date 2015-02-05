'use strict';

angular.module('jobsiesApp')
  .controller('ResumeCtrl', function($scope, User,  $q, $interpolate, user, $state) {
    $scope.profileInformation = user



    $scope.goToStep1 = function(){
      $state.go('resume')
    }
    
    $scope.goToStep2 = function(){
      $state.go('cover')
    }

    $scope.goToStep3 = function(){
      $state.go('edit')
    }



      // for(var i= 0; i< $scope.profileInformation.jobs_saved.length; i++){
      //     if($stateParams.job === $scope.profileInformation.jobs_saved[i].jobkey){
      //       $scope.coverJobID = $scope.profileInformation.jobs_saved[i]
      //       console.log($scope.coverJobID)
      //     }
      // }

    console.log($scope.profileInformation)


    if (!$scope.profileInformation.cover_letter) {
      var interpolatedString = $interpolate('Dear [name or human resources] I read with interest your posting for {{$scope.coverJobID.jobtitle}} on indeed.com. I believe I possess the necessary skills and experience you are seeking and would make a valuable addition to your company.\n\nAs my resume indicates, I possess more than {{Date1 - profileInformation.linkedin.positions.values[0].startDate.year}} years of progressive experience in the [job field] field.  My professional history includes positions such as {{profileInformation.linkedin.positions.values[0].title}} at {{profileInformation.linkedin.positions.values[0].company.name}}, as well as {{profileInformation.linkedin.positions.values[1].title}} at {{profileInformation.linkedin.positions.values[1].company.name}}. Most recently, my responsibilities as {{profileInformation.linkedin.headline}} match the qualifications you are seeking.  As the {{profileInformation.linkedin.positions.values[0].title}}, my responsibilities included {{profileInformation.linkedin.positions.values[0].summary}}  My supervisor also relied on my skills in {{profileInformation.linkedin.skills.values[1].skill.name}}, {{profileInformation.linkedin.skills.values[1].skill.name}}, and {{profileInformation.linkedin.skills.values[2].skill.name}}.\n\nHere is a link [link] to my online resume for your review and I look forward to speaking with you further regarding your available position. \n\nSincerely,\n{{profileInformation.name}}')
      $scope.cover = interpolatedString($scope);
      $scope.profileInformation.cover_letter = $scope.cover
      User.save($scope.profileInformation)

    }

    if (!$scope.profileInformation.linkedin.template){
      $scope.profileInformation.linkedin.template = 'formal'
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
      for (var property in $scope.image) {
        $scope.image[property] = false;
      }
      $scope.image[type] = true;
      $scope.profileInformation.linkedin.template = type
      User.save($scope.profileInformation)
    }



  });