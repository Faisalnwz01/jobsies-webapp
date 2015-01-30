'use strict';

describe('Controller: RhomeCtrl', function () {

  // load the controller's module
  beforeEach(module('jobsiesApp'));

  var RhomeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RhomeCtrl = $controller('RhomeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
