angular.module('myApp')
    .component('addRefueling',
    {
        templateUrl: 'app/components/add-refueling/add-refueling.template.html',
        controller: [
            '$location', '$log', 'vehicleService',
            function AddRefuelingController($location, $log, vehicleService) {
                var self = this;
                self.loading = false;
                self.noConnection = false;
                self.addRefuelingFailed = false;
                self.vehicles = [];
                self.selectedVehicleId = null;

                self.date = ''; // = new Date().getDate();
                self.missedRefuelings = false;
                self.numberOfLiters = 57.3;
                self.pricePerLiter = 13;
                self.odometerInKm = 79876;
                self.fullTank = true;

                self.loadVehicles = function () {
                    self.loading = true;
                    self.addRefuelingFailed = false;
                    vehicleService.getAll()
                        .then(
                            function (response) {
                                self.noConnection = false;
                                if (response.data && response.data.length > 0) {
                                    self.vehicles = response.data;
                                    self.selectedVehicleId = self.vehicles[0].id;
                                }
                            },
                            function (error) {
                                $log.log('Error getting vehicles, error: ' + JSON.stringify(error));
                                self.noConnection = true;
                            }
                        )
                        .finally(function () { self.loading = false; });
                }

                self.submit = function () {
                    vehicleService.addRefueling(self.selectedVehicleId, self.date, self.missedRefuelings, self.numberOfLiters, self.pricePerLiter, self.odometerInKm, self.fullTank)
                        .then(
                            function (response) {
                                $location.path('/historik');
                            },
                            function(error) {
                                self.addRefuelingFailed = true;
                            }
                        );
                }

                
                // === INIT ===
                self.loadVehicles();
            }
        ]
    });

