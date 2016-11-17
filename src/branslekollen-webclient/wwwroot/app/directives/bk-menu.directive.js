angular.module('myApp')
.directive('bkMenu', function () {
    return {
        template: 
            '<div class="row">' +
                '<div class="medium-12 columns">' + 
                    '<div class="button-group">' + 
                        '<a href="#!/dashboard" class="button">Dashboard</a>' + 
                        '<a href="#!/statistik" class="button">Statistik</a>' +
                        '<a href="#!/lagg-till-tankning" class="button">Tanka!</a>' +
                        '<a href="#!/historik" class="button">Historik</a>' +
                        '<a href="#!/profil" class="button">Profil</a>' +
                    '</div>' + 
                '</div>' + 
            '</div>'
    };
});