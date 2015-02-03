'use strict';

describe('Directive: autocomplete', function () {

  // load the directive's module
  beforeEach(module('jobsiesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<autocomplete></autocomplete>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the autocomplete directive');
  }));
});