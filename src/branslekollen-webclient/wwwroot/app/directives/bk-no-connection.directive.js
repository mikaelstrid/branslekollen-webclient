angular.module('myApp')
.directive('bkNoConnection', function () {
    return {
        scope: {
            message: '@',
            retryFn: '='
        },
        template:
            '<div class="row">' +
                '<div class="medium-12 columns">' + 
                    '<p>{{message}}</p>' +
                    '<a class="button" ng-if="retryFn" ng-click="retryFn()">Försök igen</a>' +
                '</div>' + 
            '</div>'
    };
});