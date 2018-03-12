'use strict';

(function () {

    angular.module('app')
      .component('countryView', {

        bindings: {
          country: '<'
        },
        templateUrl: 'app/components/countryViewComponent/countryView.html',
        controller: countryViewController,
        controllerAs: 'vm'

      });

    function countryViewController($scope) {

      const vm = this;

      _.assign(vm, {});

      $scope.$watch('vm.country', (nv, ov) => {

        if (nv !== ov) {
          calculateCountryName();
        }

        calculateCountryName();

      });

      function calculateCountryName() {
        let currencyName = _.get(vm.country, 'currencies[0].name');

        let countyName = _.get(vm.country, 'cioc') || _.get(vm.country, 'alpha2Code');

        if (currencyName.split(' ').length === 1) {
          currencyName = `${_.get(vm.country, 'demonym')} ${currencyName}`;
        }

        vm.countryFull = `${countyName} - ${currencyName}`;

      }

    }

  }

)();
