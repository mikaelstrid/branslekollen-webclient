angular.module('myApp')
    .component('start',
    {
        templateUrl: 'app/components/start/start.template.html',
        controller: ['$location', '$log', 'vehicleService',
            function StartController($location, $log, vehicleService) {
                var self = this;
                self.loading = true;
                self.noConnection = false;

                self.loadVehicles = function() {
                    self.loading = true;
                    vehicleService.getAll()
                        .then(
                            function(response) {
                                self.noConnection = false;
                                if (response.data && response.data.length > 0)
                                    $location.path('/dashboard');
                            },
                            function(error) {
                                self.noConnection = true;
                            }
                        )
                        .finally(function() { self.loading = false; });
                }

                self.loadVehicles();
            }
        ]
    });

