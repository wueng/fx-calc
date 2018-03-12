'use strict';

(function () {

  let inFocus = false;

  function trackFocused($rootScope, $timeout) {
    return {

      restrict: 'A',

      link: function (scope, element) {

        element.on('focus', function () {
          inFocus = true;
          $rootScope.hasInputInFocus = true;
          // $rootScope.$apply();
        });

        element.on('blur', function () {
          // console.warn(arguments);
          inFocus = false;
          $timeout(500).then(() => {
            $rootScope.hasInputInFocus = inFocus;
          });
        });

      }

    };
  }

  angular.module('app')
    .directive('trackFocused', trackFocused);

})();
