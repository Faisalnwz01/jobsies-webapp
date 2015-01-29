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
    $scope.currentJob = 0;
    $scope.page = 0;
    $scope.totalResults;
    $scope.jobsSeen = 0;

    $scope.search = function(now) { 
      var indeed_client = new Indeed("85923786885096");
    indeed_client.search({
        q: 'javascript perl ajax',
        l: 'new york',
        limit: '25',
        start: now,
        highlight: 0,
        userip: '1.2.3.4',
        useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2)',
    }, function(search_response){
      console.log(search_response)
      $scope.jobArray = search_response.results;
      $scope.totalResults = search_response.totalResults;
      $scope.$apply();
    });
    }
   $scope.search();
   $scope.savedJob= function(job){
    $scope.currentJob += 1;
    $scope.jobsSeen += 1;
    if($scope.jobsSeen == $scope.totalResults){
      $scope.searchDone = true;
    }
    if($scope.currentJob === 25){
      if($scope.jobsSeen < $scope.totalResults){
        $scope.page +=1;
        $scope.currentJob = 0;
        $scope.search(25*$scope.page);
      }
    }
   }
  });
