angular.module('myApp')
    .component('refueling',
    {
        templateUrl: 'app/components/refueling/refueling.template.html',
        controller: [
            '$location', '$log', '$routeParams', 'vehicleService',
            function RefuelingController($location, $log, $routeParams, vehicleService) {
                var self = this;
                self.loadingVehicles = false;
                self.failedWhenLoadingVehicles = false;
                self.failedWhenLookingForMatchingRefuelingId = false;
                self.failedWhenSavingChanges = false;
                self.vehicles = [];
                self.selectedVehicleId = null;
                self.isInEditMode = false;

                self.currentRefueling = null;


                self.loadVehicles = function() {
                    self.loadingVehicles = true;
                    self.failedWhenSavingChanges = false;
                    vehicleService.getAll()
                        .then(
                            function(response) {
                                self.failedWhenLoadingVehicles = false;
                                if (response.data && response.data.length > 0) {
                                    self.vehicles = response.data;
                                    self.displayRefueling();
                                }
                            },
                            function(error) {
                                $log.log('Error getting vehicles, error: ' + JSON.stringify(error));
                                self.failedWhenLoadingVehicles = true;
                            }
                        )
                        .finally(function() { self.loadingVehicles = false; });
                }

                self.displayRefueling = function () {
                    var vehicle = _.find(self.vehicles, function(v) { return v.id === $routeParams.vehicleId });

                    if (!vehicle) {
                        $log.log('No vehicle with id ' + $routeParams.vehicleId + 'found.');
                        self.failedWhenLookingForMatchingRefuelingId = true;
                        return;
                    }

                    self.currentRefueling = _.find(vehicle.refuelings, function (r) { return r.id === $routeParams.refuelingId });

                    if (self.currentRefueling) {
                        self.currentRefueling.date = new Date(self.currentRefueling.date);
                    }
                    else {
                        $log.log('No refueling with id ' + $routeParams.refuelingId + 'found.');
                        self.failedWhenLookingForMatchingRefuelingId = true;
                    }
                }

                self.submit = function () {
                    vehicleService.updateRefueling($routeParams.vehicleId, self.currentRefueling)
                        .then(
                            function (response) {
                                $log.log('Refueling updated.');
                                self.isInEditMode = false;
                            },
                            function (error) {
                                $log.log('Error updating refueling, error: ' + JSON.stringify(error));
                                self.failedWhenSavingChanges = true;
                            }
                        );
                }


                // === INIT ===
                self.loadVehicles();
            }
        ]

    });

