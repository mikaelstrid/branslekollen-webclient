angular.
  module('myApp').
  factory('vehicleService', ['$http',
    function ($http) {

        var serviceBaseUrl = 'http://localhost:51058/api';
        var resourceUrl = '/vehicles';

        return {
            create: create
        }

        function create(name, fuel) {
            return $http.post(serviceBaseUrl + resourceUrl, { name: name, fuel: fuel });
        }
    }
  ]);