'use strict';

describe('Controller: RjobspostedCtrl', function () {

  // load the controller's module
  beforeEach(module('jobsiesApp'));

  var RjobspostedCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RjobspostedCtrl = $controller('RjobspostedCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
