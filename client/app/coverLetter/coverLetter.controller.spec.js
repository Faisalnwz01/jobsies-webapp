'use strict';

describe('Controller: CoverLetterCtrl', function () {

  // load the controller's module
  beforeEach(module('jobsiesApp'));

  var CoverLetterCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CoverLetterCtrl = $controller('CoverLetterCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
