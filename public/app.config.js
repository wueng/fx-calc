var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'vs-repeat']);

app.config(['$locationProvider', ($locationProvider) => {
  $locationProvider.html5Mode(false);
  $locationProvider.hashPrefix('');
}]);
