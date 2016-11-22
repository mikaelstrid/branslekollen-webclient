angular.module('myApp')
    .component('history',
    {
        templateUrl: 'app/components/history/history.template.html',
        controller: [
            '$log', 'vehicleService',
            function HistoryController($log, vehicleService) {
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

                self.loadVehicles();
            }
        ]
    });

