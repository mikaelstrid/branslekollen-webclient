angular.module('myApp')
    .component('start',
    {
        templateUrl: 'app/components/start/start.template.html',
        controller: ['$location', '$log', 'vehicleService',
            function StartController($location, $log, vehicleService) {
                vehicleService.getAll()
                    .then(
                        function (response) {
                            if (response.data && response.data.length > 0)
                                $location.path('/dashboard');
                        }
                    );
            }
        ]
    });

