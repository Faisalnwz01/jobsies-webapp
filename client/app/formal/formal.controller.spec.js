'use strict';

describe('Controller: FormalCtrl', function () {

  // load the controller's module
  beforeEach(module('jobsiesApp'));

  var FormalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormalCtrl = $controller('FormalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
