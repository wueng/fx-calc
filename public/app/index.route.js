'use strict';

(function () {

  angular
    .module('app')
    .config(routerConfig);

  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        template: '<main-component></main-component>'
      });

    $urlRouterProvider.otherwise('home');
  }

})();
