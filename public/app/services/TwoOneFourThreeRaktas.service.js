'use strict';

(function () {

  function TwoOneFourThreeRaktasService() {

    const me = {};

    return _.assign(me, {
      getRaktas: getRaktas
    });

    function getRaktas() {

      let one = '1892ee';
      let two = '603b3c';
      let three = 'dcc76edc4';
      let four = '14e2428d6cc';

      return two + one + four + three;

    }

  }

  angular.module('app')
    .service('TwoOneFourThreeRaktas', TwoOneFourThreeRaktasService);

})();
