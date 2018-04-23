angular.module('fxCalculatorApp').config(function($locationProvider, $stateProvider) {

    $locationProvider.hashPrefix('');

    $stateProvider
        .state('home', {
            url: '',
            templateUrl: 'views/main.html',
            controller: 'MainController as controller'
        })
});
