angular.module('myApp')
.directive('bkLoadingVehicles', function () {
    return {
        template: 
            '<div class="row">' +
                '<div class="medium-12 columns">' + 
                    '<p>Laddar fordon...</p>' +
                '</div>' + 
            '</div>'
    };
});