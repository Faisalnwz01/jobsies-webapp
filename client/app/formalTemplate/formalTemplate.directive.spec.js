'use strict';

describe('Directive: formalTemplate', function () {

  // load the directive's module and view
  beforeEach(module('jobsiesApp'));
  beforeEach(module('app/formalTemplate/formalTemplate.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<formal-template></formal-template>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the formalTemplate directive');
  }));
});