angular.module('myApp')
    .filter('fuelConsumption', 
        function(numberFilter) {
            return function(inputInLitersPerKm) {
                return inputInLitersPerKm == null ? '-' : numberFilter(inputInLitersPerKm * 10, 2)  + ' l/mil';
            };
        });