'use strict';

describe('Controller: RsignupCtrl', function () {

  // load the controller's module
  beforeEach(module('jobsiesApp'));

  var RsignupCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RsignupCtrl = $controller('RsignupCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
