'use strict';

describe('Service: users', function () {

  // load the service's module
  beforeEach(module('jobsiesApp'));

  // instantiate service
  var users;
  beforeEach(inject(function (_users_) {
    users = _users_;
  }));

  it('should do something', function () {
    expect(!!users).toBe(true);
  });

});
