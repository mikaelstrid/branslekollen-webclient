angular.module('myApp')
    .component('dashboard',
    {
        templateUrl: 'app/components/dashboard/dashboard.template.html',
        controller: [
            '$location', '$log', 'vehicleService',
            function DashboardController($location, $log, vehicleService) {
                var self = this;
                self.loadingVehicles = false;
                self.gettingStatistics = false;
                self.failedLoadingVehicles = false;
                self.failedGettingStatistics = false;
                self.vehicles = [];
                self.selectedVehicleId = null;
                self.statistics = null;

                self.selectedTimeframe = 'month';
                self.timeframeOffset = 0;
                self.startDate = null;
                self.endDate = null;

                self.loadVehicles = function () {
                    self.loadingVehicles = true;
                    vehicleService.getAll()
                        .then(
                            function (response) {
                                self.failedLoadingVehicles = false;
                                if (response.data && response.data.length > 0) {
                                    self.vehicles = response.data;
                                    self.selectedVehicleId = self.vehicles[0].id;

                                    self.updateStatistics();
                                }
                            },
                            function (error) {
                                $log.log('Error getting vehicles, error: ' + JSON.stringify(error));
                                self.failedLoadingVehicles = true;
                            }
                        )
                        .finally(function () { self.loadingVehicles = false; });
                }

                self.updateTimeframe = function () {
                    self.startDate = moment().startOf(self.selectedTimeframe).add(self.timeframeOffset, self.selectedTimeframe).toDate();
                    self.endDate = moment(self.startDate).endOf(self.selectedTimeframe).toDate();
                }

                self.selectedTimeframeChanged = function () {
                    self.timeframeOffset = 0;
                    self.updateTimeframe();
                    self.updateStatistics();
                }

                self.changePeriod = function(offsetChange) {
                    self.timeframeOffset = self.timeframeOffset + offsetChange;
                    self.updateTimeframe();
                    self.updateStatistics();
                }

                self.updateStatistics = function() {
                    self.gettingStatistics = true;
                    vehicleService.getStatistics(self.selectedVehicleId, self.startDate, self.endDate)
                        .then(
                            function(response) {
                                self.failedGettingStatistics = false;
                                self.statistics = response.data;
                            },
                            function(error) {
                                $log.log('Error getting statistics, error: ' + JSON.stringify(error));
                                self.failedGettingStatistics = true;
                            }
                        )
                        .finally(function () { self.gettingStatistics = false; });
                }

                // === INIT ===
                self.updateTimeframe();
                self.loadVehicles();
            }
        ]
    });

