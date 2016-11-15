angular.
  module('myApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
          when('/dashboard', {
              template: '<dashboard></dashboard>'
          }).
          when('/lagg-till-fordon', {
              template: '<create-vehicle></create-vehicle>'
          }).
          otherwise('/dashboard');
    }
  ]);