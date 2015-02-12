'use strict';

angular.module('jobsiesApp')
    .factory('indeedapi', function($http, $q, Auth) {
        return {
            getIndeedJobs: function(query, location, start) {
                return new $q(function(resolve, reject) {
                    if (location.indexOf(",") > -1) {
                        var new_location = location.split(",")[0];
                    } else {
                        new_location = location;
                    }
                    $.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + new_location + "&sensor=true")
                        .then(function(data) {
                            if(data.status === "ZERO_RESULTS"){
                                resolve(data.status);
                            }
                            else{
                                var user_info = Auth.getCurrentUser()._id;
                                var state = data.results[0].address_components[2].short_name;
                                $http.put('api/jobs/getIndeedJobs/', {
                                    query: query,
                                    city: new_location,
                                    state: state,
                                    start: start,
                                    user_info: user_info
                                })
                                    .then(function(response){
                                        resolve(response);
                                    })
                                }
                        })

                })

            }
        };
    });