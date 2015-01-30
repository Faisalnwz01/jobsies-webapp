'use strict';

angular.module('jobsiesApp')
  .controller('MainCtrl', function ($scope, $http, socket, $timeout, $mdSidenav, $log) {

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
$scope.loginOauth =function (provider) {
  $window.location.href ='/auth/' + provider;

}
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
        q: 'javascript',
        l: 'new york',
        limit: '1000',
        start: now,
        allbit: '1',
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
  $scope.toggleLeft = function() {
    $mdSidenav('left').toggle()
                      .then(function(){
                          $log.debug("toggle left is done");
                      });
  };
  $scope.toggleRight = function() {
    $mdSidenav('right').toggle()
                        .then(function(){
                          $log.debug("toggle RIGHT is done");
                        });
  };



  })
.controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function() {
    $mdSidenav('left').close()
                      .then(function(){
                        $log.debug("close LEFT is done");
                      });
  };
})
.controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function() {
    $mdSidenav('right').close()
                        .then(function(){
                          $log.debug("close RIGHT is done");
                        });
  };
});
