'use strict';

describe('Directive: recruiterhome', function () {

  // load the directive's module and view
  beforeEach(module('jobsiesApp'));
  beforeEach(module('app/recruiterhome/recruiterhome.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<recruiterhome></recruiterhome>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the recruiterhome directive');
  }));
});