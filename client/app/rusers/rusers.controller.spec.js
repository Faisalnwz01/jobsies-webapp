'use strict';

describe('Controller: RusersCtrl', function () {

  // load the controller's module
  beforeEach(module('jobsiesApp'));

  var RusersCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RusersCtrl = $controller('RusersCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
