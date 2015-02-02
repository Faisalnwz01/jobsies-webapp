'use strict';

describe('Controller: RstatsCtrl', function () {

  // load the controller's module
  beforeEach(module('jobsiesApp'));

  var RstatsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RstatsCtrl = $controller('RstatsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
