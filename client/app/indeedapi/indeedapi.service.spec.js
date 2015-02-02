'use strict';

describe('Service: indeedapi', function () {

  // load the service's module
  beforeEach(module('jobsiesApp'));

  // instantiate service
  var indeedapi;
  beforeEach(inject(function (_indeedapi_) {
    indeedapi = _indeedapi_;
  }));

  it('should do something', function () {
    expect(!!indeedapi).toBe(true);
  });

});
