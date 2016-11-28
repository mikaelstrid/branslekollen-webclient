angular.module('myApp')
    .component('history',
    {
        templateUrl: 'app/components/history/history.template.html',
        controller: [
            '$location', '$log', 'vehicleService',
            function HistoryController($location, $log, vehicleService) {
                var self = this;
                self.loading = false;
                self.noConnection = false;
                self.vehicles = [];
                self.selectedVehicle = null;

                self.loadVehicles = function() {
                    self.loading = true;
                    self.addRefuelingFailed = false;
                    vehicleService.getAll()
                        .then(
                            function(response) {
                                self.noConnection = false;
                                if (response.data && response.data.length > 0) {
                                    self.vehicles = response.data;
                                    self.selectedVehicle = self.vehicles[0];
                                }
                            },
                            function(error) {
                                $log.log('Error getting vehicles, error: ' + JSON.stringify(error));
                                self.noConnection = true;
                            }
                        )
                        .finally(function() { self.loading = false; });
                }

                self.gotoDetails = function(refuelingId) {
                    $location.path('/tankning/' + self.selectedVehicle.id + '/' + refuelingId);
                }


                self.loadVehicles();
            }
        ]
    });

