'use strict';

describe('Service: userPreferences', function () {

  // load the service's module
  beforeEach(module('jobsiesApp'));

  // instantiate service
  var userPreferences;
  beforeEach(inject(function (_userPreferences_) {
    userPreferences = _userPreferences_;
  }));

  it('should do something', function () {
    expect(!!userPreferences).toBe(true);
  });

});
