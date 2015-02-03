'use strict';

describe('Directive: recruiterhomethree', function () {

  // load the directive's module and view
  beforeEach(module('jobsiesApp'));
  beforeEach(module('app/recruiterhomethree/recruiterhomethree.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<recruiterhomethree></recruiterhomethree>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the recruiterhomethree directive');
  }));
});