'use strict';

angular.module('jobsiesApp')
    .factory('indeedapi', function($http, $q) {
        return {
            getIndeedJobs: function(query, location, start) {
                return new $q(function(resolve, reject) {
                    // var indeed_client = new Indeed("85923786885096");
                    // indeed_client.search({
                    //     q: query,
                    //     l: location,
                    //     limit: '1000',
                    //     start: start,
                    //     allbit: '1',
                    //     highlight: 0,
                    //     userip: '1.2.3.4',
                    //     useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2)',
                    // }, 
                        $http.put('api/jobs/getIndeedJobs', {query: query, location:location, start: start})
                            .then(function(response){
                                console.log(response)
                            })
                        // function(search_response) {
                        // var jobArray = search_response.results;
                        // var totalResults = search_response.totalResults;
                        // $http.post('/api/jobs/cheerio', jobArray)
                        //     .success(function(results) {
                        //         jobArray = results;
                        //         resolve({jobArray: jobArray, totalResults: totalResults})
                        //     })
                        // }
                })

            }
        };
    });

////return new $q function(resolve, reject)
// $q takes those two arguments
//reject("fjdsa") return at error
// resolve ({x:1}) is the value we want to treturn \


// getJobs = indeedapi.getJobs
// then call getJobs.then(resolved value)
// and .catch to get error