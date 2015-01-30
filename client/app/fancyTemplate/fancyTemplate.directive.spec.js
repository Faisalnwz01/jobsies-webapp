'use strict';

describe('Directive: fancyTemplate', function () {

  // load the directive's module and view
  beforeEach(module('jobsiesApp'));
  beforeEach(module('app/fancyTemplate/fancyTemplate.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fancy-template></fancy-template>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the fancyTemplate directive');
  }));
});