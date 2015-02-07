'use strict';

describe('Service: recruiterJobs', function () {

  // load the service's module
  beforeEach(module('jobsiesApp'));

  // instantiate service
  var recruiterJobs;
  beforeEach(inject(function (_recruiterJobs_) {
    recruiterJobs = _recruiterJobs_;
  }));

  it('should do something', function () {
    expect(!!recruiterJobs).toBe(true);
  });

});
