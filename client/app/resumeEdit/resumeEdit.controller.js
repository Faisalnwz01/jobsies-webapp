'use strict';

angular.module('jobsiesApp')
    .controller('ResumeEditCtrl', function($scope, User) {
        $scope.profileInformation; 
            $scope.user = User.get().$promise.then(function(user) {
                $scope.profileInformation = user
                console.log(user)
                $scope.profileInformation
                
                console.log($scope.profileInformation)

            })
            $scope.update = function() {
                console.log($scope.profileInformation, 'this is profileInformation')
                console.log(User.save($scope.profileInformation))
            }

       

            });