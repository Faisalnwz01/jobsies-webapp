'use strict';

describe('Service: SaveJobs', function () {

  // load the service's module
  beforeEach(module('jobsiesApp'));

  // instantiate service
  var SaveJobs;
  beforeEach(inject(function (_SaveJobs_) {
    SaveJobs = _SaveJobs_;
  }));

  it('should do something', function () {
    expect(!!SaveJobs).toBe(true);
  });

});
