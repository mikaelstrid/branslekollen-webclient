angular.module('myApp')
    .component('createVehicle',
    {
        templateUrl: 'app/components/create-vehicle/create-vehicle.template.html',
        controller: ['$location', 'vehicleService',
            function CreateVehicleController($location, vehicleService) {
                var self = this;
                self.inProgress = false;
                self.createOk = false;
                self.createFailed = false;
                self.vehicleName = '';
                self.fuel = 'petrol';

                self.submit = function () {
                    self.inProgress = true;
                    self.createOk = false;
                    self.createFailed = false;
                    vehicleService.create(this.vehicleName, this.fuel)
                        .then(
                            function(response) {
                                $location.path('/dashboard');
                            },
                            function(error) {
                                self.createFailed = true;
                            }
                        )
                        .finally(function() { self.inProgress = false; });
                }
            }
        ]
    });

