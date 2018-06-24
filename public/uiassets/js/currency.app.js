var app = angular.module("currencyApp", ["ngRoute","currencyFactory"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "pages/index.html",
        controller:'currencyController'
    })
});
