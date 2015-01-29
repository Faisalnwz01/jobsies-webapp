'use strict';

angular.module('jobsiesApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.jobArray;


    $scope.search = function(now) { 
      var indeed_client = new Indeed("85923786885096");
    indeed_client.search({
        q: 'javascript',
        l: 'new york',
        limit: '25',
        start: now,
        userip: '1.2.3.4',
        useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2)',
    }, function(search_response){
      console.log(search_response)
      $scope.jobArray = search_response.results;
      $scope.$apply();
    });
    }
  $scope.search();
  });
