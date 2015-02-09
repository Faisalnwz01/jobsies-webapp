'use strict';

angular.module('jobsiesApp')
    .factory('indeedapi', function($http, $q) {
        return {
            getIndeedJobs: function(query, location, start) {
                return new $q(function(resolve, reject) {
                    if (location.indexOf(",") > -1) {
                        var new_location = location.split(",")[0];
                    } else {
                        new_location = location;
                    }
                    $.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + new_location + "&sensor=true")
                        .then(function(data) {
                            var state = data.results[0].address_components[2].short_name;
                            $http.put('api/jobs/getIndeedJobs/', {
                                query: query,
                                city: new_location,
                                state: state,
                                start: start
                            })
                                .then(function(search_response) {
                                    var jobArray = search_response.data.results;
                                    var totalResults = search_response.data.totalResults;
                                    $http.post('/api/jobs/cheerio', jobArray)
                                        .success(function(results) {
                                            jobArray = results;
                                            resolve({
                                                jobArray: jobArray,
                                                totalResults: totalResults
                                            })
                                        })
                                })
                        })

                })

            }
        };
    });