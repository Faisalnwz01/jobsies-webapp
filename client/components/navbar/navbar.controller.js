'use strict';

angular.module('jobsiesApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, User) {
    // $scope.menu = [{
    //   'title': 'Home',
    //   'link': '/'
    // }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isRecruiter = Auth.isRecruiter;
    $scope.isUser = Auth.isUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });