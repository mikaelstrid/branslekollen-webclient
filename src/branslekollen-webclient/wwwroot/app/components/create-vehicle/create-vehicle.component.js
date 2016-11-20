angular.module('myApp')
    .component('createVehicle',
    {
        templateUrl: 'app/components/create-vehicle/create-vehicle.template.html',
        controller: ['vehicleService',
            function CreateVehicleController(vehicleService) {
                this.vehicleName = '';
                this.fuel = 'petrol';

                this.submit = function () {
                    vehicleService.create(this.vehicleName, this.fuel)
                        .then(
                            function(response) { alert('OK!'); },
                            function(error) { alert('Det gick inte att lägga till fordonet. :('); }
                        );
                }
            }
        ]
    });

