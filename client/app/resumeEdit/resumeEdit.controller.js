'use strict';

angular.module('jobsiesApp')
    .controller('ResumeEditCtrl', function($scope, User, SaveJobs) {
        $scope.profileInformation; 
            $scope.user = User.get().$promise.then(function(user) {
                $scope.profileInformation = user
            if(!$scope.profileInformation.linkedin.phone){
                $scope.profileInformation.linkedin.phone = ''
            }
            if(!$scope.profileInformation.linkedin.emailAddress){
                $scope.profileInformation.linkedin.emailAddress = ''
            }
          
                
                $scope.coverLetterJob= $scope.profileInformation.cover_letter.length -1

if(!$scope.profileInformation.linkedin.currentCoverLetter){

  $scope.profileInformation.linkedin.currentCoverLetter = $scope.profileInformation.cover_letter[$scope.coverLetterJob]
}
console.log($scope.profileInformation.linkedin.currentCoverLetter)



$scope.update()
                 
  

            })
            $scope.update = function() {
               
            }


 $scope.filter= function(){
  if($scope.profileInformation.linkedin.ShowCoverLetter === false){
    $scope.profileInformation.linkedin.ShowCoverLetter = true; 
  }
  else{
  $scope.profileInformation.linkedin.ShowCoverLetter = false
}
$scope.update(); 
 } 


  $scope.getCoverLetterJob = function(job){
      $scope.coverLetterJob = job 
      $scope.profileInformation.linkedin.currentCoverLetter = $scope.profileInformation.cover_letter[job].text
      console.log($scope.profileInformation.linkedin.currentCoverLetter)
      User.save($scope.profileInformation)

    }





      $scope.addPosition = function() {
      $scope.newPosition = {
        company: {name: "Edit Company Name"},
        summary: "Edit Position summary", 
          title: "Edit Position title"
        }
     
      $scope.profileInformation.linkedin.positions.values.push($scope.newPosition)
      $scope.update()
    };

    $scope.addContact = function() {
      $scope.newContact = {
        feild: "Edit Contact Feild",
        information: "Edit Contact Information", 
        }
     
      $scope.profileInformation.linkedin.contacts.contacts.push($scope.newContact)
      $scope.update()
    };

    $scope.addSkill = function() {
      $scope.newSkill = {
        id: $scope.profileInformation.linkedin.skills.values.length +1, 
        skill: {
          name: "edit name",
          level: 5 

        }
      };
      $scope.profileInformation.linkedin.skills.values.push($scope.newSkill)
      
    };

    $scope.addEducation = function() {
      $scope.newEducation = {
        degree: "Degree", 
          fieldOfStudy: "Major",
          notes: "Description", 
          schoolName: "School Name", 
          startDate: {year: "Start Date"}, 
          endDate: {year: "End Date"}  

        
      };
      $scope.profileInformation.linkedin.educations.values.push($scope.newEducation)
      
    };



$scope.remove = function(item) { 
  console.log(item)
  console.log($scope.profileInformation.linkedin.positions.values)
  var index = $scope.profileInformation.linkedin.positions.values.indexOf(item)
  console.log(index)
  $scope.profileInformation.linkedin.positions.values.splice(index, 1);     
}

$scope.deleteFilteredItem = function(hashKey, sourceArray){
  angular.forEach(sourceArray, function(obj, index){
    // sourceArray is a reference to the original array passed to ng-repeat, 
    // rather than the filtered version. 
    // 1. compare the target object's hashKey to the current member of the iterable:
    if (obj.$$hashKey === hashKey) {
      // remove the matching item from the array
      sourceArray.splice(index, 1);
      $scope.update()
      // and exit the loop right away
      return;
    };
  });
}

            });