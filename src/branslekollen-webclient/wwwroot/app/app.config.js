angular.
  module('myApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
            when('/start', {
                template: '<start></start>'
            }).
            when('/dashboard', {
                template: '<dashboard></dashboard>'
            }).
            when('/statistik', {
                template: '<statistics></statistics>'
            }).
            when('/lagg-till-tankning', {
                template: '<add-refueling></add-refueling>'
            }).
            when('/historik', {
                template: '<history></history>'
            }).
            when('/profil', {
                template: '<profile></profile>'
            }).
            when('/lagg-till-fordon', {
                template: '<create-vehicle></create-vehicle>'
            }).
            when('/tankning/:vehicleId/:refuelingId', {
                template: '<refueling></refueling>'
            }).
            otherwise('/start');
    }
  ]);