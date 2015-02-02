'use strict';

angular.module('jobsiesApp')
	.controller('CoverLetterCtrl', function($scope, $http, Auth, $interpolate, user) {


	
$scope.profileInformation = user
if (!$scope.profileInformation.cover_letter){
		var interpolatedString = $interpolate('Dear [name or human resources] \n\nI read with interest your posting for [name of position] on indeed.com. I believe I possess the necessary skills and experience you are seeking and would make a valuable addition to your company.\n\nAs my resume indicates, I possess more than {{Date1 - profileInformation.linkedin.positions.values[0].startDate.year}} years of progressive experience in the [job field] field.  My professional history includes positions such as {{profileInformation.linkedin.positions.values[0].title}} at {{profileInformation.linkedin.positions.values[0].company.name}}, as well as {{profileInformation.linkedin.positions.values[1].title}} at {{profileInformation.linkedin.positions.values[1].company.name}}. Most recently, my responsibilities as {{profileInformation.linkedin.headline}} match the qualifications you are seeking.  As the {{profileInformation.linkedin.positions.values[0].title}}, my responsibilities included {{profileInformation.linkedin.positions.values[0].summary}}  My supervisor also relied on my skills in {{profileInformation.linkedin.skills.values[1].skill.name}}, {{profileInformation.linkedin.skills.values[1].skill.name}}, and {{profileInformation.linkedin.skills.values[2].skill.name}}.\n\nHere is a link [link] to my online resume for your review and I look forward to speaking with you further regarding your available position. \n\nSincerely,\n{{profileInformation.name}}')
		$scope.cover = interpolatedString($scope);
		$scope.profileInformation.cover_letter = $scope.cover
	
}

// console.log($scope.profileInformation.cover_letter, 'profileeeeeeeeeeeeeeeeeeee')
// if(!$scope.profileInformation.cover_letter)
				// $scope.profileInformation.cover_letter=  $scope.coverLetter;
			// console.log($scope.profileInformation.cover_letter)

	

console.log($scope.profileInformation)



		$scope.Date1 = new Date().getFullYear();

		$scope.update = function(cover) {
			

			$http.post('/api/users/' + Auth.getCurrentUser()._id + '/', {
				cover_letter: cover
			}).success(function(data) {
				console.log(data);
			});
		}


	});