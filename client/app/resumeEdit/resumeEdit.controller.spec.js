'use strict';

describe('Controller: ResumeEditCtrl', function () {

  // load the controller's module
  beforeEach(module('jobsiesApp'));

  var ResumeEditCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResumeEditCtrl = $controller('ResumeEditCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
