'use strict';

describe('Controller: FancyCtrl', function () {

  // load the controller's module
  beforeEach(module('jobsiesApp'));

  var FancyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FancyCtrl = $controller('FancyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
