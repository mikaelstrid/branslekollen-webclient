angular.module('myApp')
    .component('createVehicle',
    {
        templateUrl: 'app/create-vehicle/create-vehicle.template.html',
        controller: ['vehicleService',
            function CreateVehicleController(vehicleService) {
                this.vehicleName = '';
                this.fuel = 'petrol';
                this.submit = function () {
                    vehicleService.create(this.vehicleName, this.fuel);
                }
            }
        ]
    });

