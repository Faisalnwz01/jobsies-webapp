'use strict';

angular.module('jobsiesApp')
  .controller('FormalCtrl', function ($scope, $stateParams, User, $modal, $http) {
  	console.log($stateParams.id)
  	$http.get('api/users/'+$stateParams.id+'/resume').success(function(user){
  		$scope.profileInformation = user

    
    



  	})



  
    

     $scope.openModal = function() {
      $scope.modal = $modal.open({
        templateUrl: '../../components/modal/coverModal.html',
        scope: $scope
      })
    };
  });
