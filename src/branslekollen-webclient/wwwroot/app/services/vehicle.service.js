angular.
  module('myApp').
  factory('vehicleService', ['$http', '$q', '$log', 'localStorageService',
    function ($http, $q, $log, localStorageService) {

        var serviceBaseUrl = 'http://localhost:51058/api';
        var vehiclePath = '/vehicles';
        var statisticsPath = '/statistics';

        var localStorageKey = 'bkVehicleIds';
        var localVehicles = [];

        return {
            getAll: getAll,
            create: create,
            addRefueling: addRefueling,
            getStatistics: getStatistics
        }

        function getAll() {
            var deferred = $q.defer();

            if (localVehicles.length > 0) {
                $log.log('vehicleService.getAll: Found ' + localVehicles.length + ' local vehicles in memory.');
                deferred.resolve({ data: localVehicles });
                return deferred.promise;
            }

            var localIds = getIdsFromLocalStorage();
            if (localIds.length > 0) {
                var url = serviceBaseUrl + vehiclePath + '/ids';
                $log.log('vehicleService.getAll: Making GET request to ' + url + ' with ids ' + JSON.stringify(localIds) + '...');
                $http.get(url, { params: { ids: localIds }})
                    .then(
                        function(response) {
                            $log.log('vehicleService.getAll: ...response ' + JSON.stringify(response.data));
                            localVehicles = response.data;
                            updateIdsInLocalStorage(_.map(localVehicles, function(i) { return i.id; }));
                            deferred.resolve({ data: localVehicles });
                        },
                        function(error) {
                            $log.log('vehicleService.getAll: ...error ' + JSON.stringify(error));
                            deferred.reject(error);
                        }
                    );
                return deferred.promise;
            } else {
                deferred.resolve(localVehicles);
                return deferred.promise;
            }
        }
        
        function create(name, fuel) {
            var deferred = $q.defer();

            var url = serviceBaseUrl + vehiclePath;
            $log.log('vehicleService.create: Making POST request to ' + url + ' with {name: ' + name + ', fuel: ' + fuel +'}...');

            $http.post(url, { name: name, fuel: fuel })
                .then(
                    function(response) {
                        $log.log('vehicleService.create: ...response ' + JSON.stringify(response.data));
                        addIdToLocalStorage(response.data.id);
                        localVehicles.push(response.data);
                        deferred.resolve(response.data);
                    },
                    function(error) {
                        $log.log('vehicleService.create: ...error ' + JSON.stringify(error));
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
        }

        function addRefueling(vehicleId, date, missedRefuelings, numberOfLiters, pricePerLiter, odometerInKm, fullTank) {
            var deferred = $q.defer();

            var url = serviceBaseUrl + vehiclePath + '/add-refueling/' + vehicleId;
            var data = {
                date: date,
                missedRefuelings: missedRefuelings,
                numberOfLiters: numberOfLiters,
                pricePerLiter: pricePerLiter,
                odometerInKm: odometerInKm,
                fullTank: fullTank
            };
            $log.log('vehicleService.addRefueling: Making POST request to ' + url + ' with data ' + JSON.stringify(data) + '...');

            $http.post(url, data)
                .then(
                    function (response) {
                        $log.log('vehicleService.addRefueling: ...response ' + JSON.stringify(response.data));
                        deferred.resolve(response.data);
                    },
                    function (error) {
                        $log.log('vehicleService.addRefueling: ...error ' + JSON.stringify(error));
                        deferred.reject(error);
                    }
                );
            return deferred.promise;
        }

        function getStatistics(vehicleId, startDate, endDate) {
            var deferred = $q.defer();
            var url = serviceBaseUrl + statisticsPath + '/vehicle/' + vehicleId + '?startDate=' + moment(startDate).format('YYYY-MM-DD') + '&endDate=' + moment(endDate).format('YYYY-MM-DD');
            
            $log.log('vehicleService.getStatistics: Making GET request to ' + url + '...');
            $http.get(url)
                .then(
                    function (response) {
                        $log.log('vehicleService.getStatistics: ...response ' + JSON.stringify(response.data));
                        deferred.resolve({ data: response.data });
                    },
                    function (error) {
                        $log.log('vehicleService.getStatistics: ...error ' + JSON.stringify(error));
                        deferred.reject(error);
                    }
                );
            return deferred.promise;
        }


        // === Private functions ===
        function getIdsFromLocalStorage() {
            var dataInStorage = localStorageService.get(localStorageKey);
            
            if (dataInStorage == null || angular.isUndefined(dataInStorage)) return [];

            if (!angular.isArray(dataInStorage)) {
                localStorageService.remove(localStorageKey);
                return [];
            }

            return dataInStorage;
        }

        function addIdToLocalStorage(id) {
            var ids = getIdsFromLocalStorage();
            ids.push(id);
            localStorageService.set(localStorageKey, ids);
        }

        function updateIdsInLocalStorage(ids) {
            localStorageService.set(localStorageKey, ids);
        }
    }
  ]);
