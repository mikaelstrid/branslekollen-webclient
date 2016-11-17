angular.module('myApp')
    .component('start',
    {
        templateUrl: 'app/start/start.template.html',
        controller: ['$location', 'localStorageService',
            function StartController($location, localStorageService) {
                var vehicleIds = localStorageService.get('bkVehicleIds');
                if (vehicleIds && vehicleIds.length > 0) {
                    $location.path('/dashboard');
                }
            }
        ]
    });

