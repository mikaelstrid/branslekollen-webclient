angular.module('myApp')
    .component('addRefueling',
    {
        templateUrl: 'app/components/add-refueling/add-refueling.template.html',
        controller: [
            '$location', '$log', 'vehicleService',
            function AddRefuelingController($location, $log, vehicleService) {
                var self = this;
                self.loading = true;
                self.vehicles = [];
                self.selectedVehicleId = null;

                self.date = ''; // = new Date().getDate();
                self.missedRefuelings = false;
                self.numberOfLiters = 57.3;
                self.pricePerLiter = 13;
                self.odometer = 79876;
                self.fullTank = true;

                self.submit = function () {
                    vehicleService.addRefueling(self.selectedVehicleId, self.date, self.missedRefuelings, self.numberOfLiters, self.pricePerLiter, self.odometer, self.fullTank)
                        .then(
                            function (response) { alert("SUCCESS!"); },
                            function (error) { alert("FAILED"); }
                        );
                }


                self.message = 'Hämtar fordon...';
                vehicleService.getAll()
                    .then(
                        function(response) {
                            if (response.data && response.data.length > 0) {
                                self.message = '';
                                self.vehicles = response.data;
                                self.selectedVehicleId = self.vehicles[0].id;
                            }
                        },
                        function(error) {
                            $log.log('Error getting vehicles, error: ' + JSON.stringigy(error));
                        }
                    )
                    .finally(function() { self.loading = false; });
            }
        ]
    });

