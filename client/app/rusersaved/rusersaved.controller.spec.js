'use strict';

describe('Controller: RusersavedCtrl', function () {

  // load the controller's module
  beforeEach(module('jobsiesApp'));

  var RusersavedCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RusersavedCtrl = $controller('RusersavedCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
