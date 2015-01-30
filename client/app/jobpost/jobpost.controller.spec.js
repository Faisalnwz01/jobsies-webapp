'use strict';

describe('Controller: JobpostCtrl', function () {

  // load the controller's module
  beforeEach(module('jobsiesApp'));

  var JobpostCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobpostCtrl = $controller('JobpostCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
