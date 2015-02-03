'use strict';

describe('Directive: recruiterhometwo', function () {

  // load the directive's module and view
  beforeEach(module('jobsiesApp'));
  beforeEach(module('app/recruiterhometwo/recruiterhometwo.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<recruiterhometwo></recruiterhometwo>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the recruiterhometwo directive');
  }));
});