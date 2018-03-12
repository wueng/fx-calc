'use strict';

(function () {

    angular.module('app')
      .component('mainComponent', {

        bindings: {},
        templateUrl: 'app/components/mainComponent/mainComponent.html',
        controller: mainComponentController,
        controllerAs: 'vm'

      });

    function mainComponentController($http, $scope, $filter, CountriesService, $timeout, safeApply, TwoOneFourThreeRaktas) {

      const vm = this;

      _.assign(vm, {

        countries: null,
        countriesLoaded: false,
        busyConverting: false,

        countriesInput: {},
        currencyInput: {},

        $onInit: $onInit,
        swapCountriesDebounceClick: swapCountriesDebounceClick,
        countrySingleClick: countrySingleClick,
        currencyToKeyPress: currencyToKeyPress

      });

      const runConverter = _.debounce(delayedConvertion, 1000);
      let runDebounceSwap = _.debounce(swapCountries, 500);

      // Watchers

      $scope.$watchCollection('[vm.currentFrom, vm.currentTo]', nv => {

        vm.countriesInput['ready'] = !!(_.get(nv, '0') && _.get(nv, '1')) || false;
        vm.countriesInput['sameCurrency'] = _.get(nv, '0.currencies[0].code') === _.get(nv, '1.currencies[0].code');
        vm.countriesInput['sameCountry'] = _.get(nv, '0.alpha2Code') === _.get(nv, '1.alpha2Code');

        if (_.get(vm.countriesInput, 'ready')) {
          delayedConvertion('>');
        }

      });

      // Functions

      function swapCountries() {
        let buffer = vm.currentFrom;
        vm.currentFrom = vm.currentTo;
        vm.currentTo = buffer;
        vm.busyDebounceSwap = false;
        safeApply($scope);
      }

      function swapCountriesDebounceClick() {

        vm.busyDebounceSwap = true;
        runDebounceSwap();

      }

      function currencyToKeyPress(ev, whereTo) {

        let allowKeyCodes = [8, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 188, 190, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110, 86];

        if (whereTo === '>') {

          if (vm.currencyFrom === null) {
            vm.currencyTo = null;
          }

        }

        if (whereTo === '<') {

          if (vm.currencyTo === null) {
            vm.currencyFrom = null;
          }

        }

        if (_.get(vm.countriesInput, 'ready') && allowKeyCodes.indexOf(ev.keyCode) > -1) {
          runConverter(whereTo);
        }

      }

      function $onInit() {
        getCountries();
      }

      function delayedConvertion(whereFrom) {

        if (_.isNumber(vm.currencyFrom) && whereFrom === '>') {

          if (_.get(vm.countriesInput, 'sameCurrency' || _.get(vm.countriesInput, 'sameCountry'))) {
            vm.currencyFrom ? vm.currencyTo = vm.currencyFrom : vm.currencyFrom = vm.currencyTo;
            safeApply($scope);
            calcConvertInfo(vm.currencyTo, '>');
          } else {
            convertCurrencies('>');
          }

        }

        if (_.isNumber(vm.currencyTo) && whereFrom === '<') {

          if (_.get(vm.countriesInput, 'sameCurrency' || _.get(vm.countriesInput, 'sameCountry'))) {
            vm.currencyFrom ? vm.currencyFrom = vm.currencyTo : vm.currencyTo = vm.currencyFrom;
            safeApply($scope);
            calcConvertInfo(vm.currencyTo, '>');
          } else {
            convertCurrencies('<');
          }

        }

      }

      function convertCurrencies(whereFrom) {

        vm.busyConverting = true;

        let from = 'currentFrom';
        let to = 'currentTo';
        let currencyFrom = 'currencyFrom';
        let currencyTo = 'currencyTo';

        if (whereFrom === '<') {
          from = 'currentTo';
          to = 'currentFrom';
          currencyFrom = 'currencyTo';
          currencyTo = 'currencyFrom';
        }

        let url = 'http://apilayer.net/api/';
        let method = 'convert';
        let fromTo = `from=${vm[from].currencies[0].code}&to=${vm[to].currencies[0].code}`;
        let amount = `amount=${parseFloat(vm[currencyFrom])}`;

        let requestStr = `${url}${method}?access_key=${TwoOneFourThreeRaktas.getRaktas()}&${fromTo}&${amount}`;

        $http({
          method: 'GET',
          url: requestStr
        }).then(function successCallback(res) {

          vm.convertionText = `From ${_.get(res, 'data.query.from')} to ${_.get(res, 'data.query.to')}`;

          let resultConvertion = _.get(res, 'data.result');

          vm[currencyTo] = resultConvertion;

          calcConvertInfo(resultConvertion, whereFrom);

        }, function errorCallback(err) {

          console.error(err);

          vm.currencyTo = null;
          vm.currencyFrom = null;

        });

      }

      function calcConvertInfo(to, whereFrom) {

        vm.busyConverting = false;

        if (whereFrom === '<') {
          return;
        }

        let convertInfoFrom = `1 ${_.get(vm.currentFrom, 'currencies[0].code')}`;

        let proroption = (parseFloat(to / vm.currencyFrom));

        let convertInfoTo = `${proroption.toFixed(3)} ${_.get(vm.currentTo, 'currencies[0].code')}`;

        vm.concatedConvertInfo = `${convertInfoFrom} = ${convertInfoTo}`;

      }

      function countrySingleClick(country, where) {

        if (where) {
          vm.currentTo === country ? vm.currentTo = null : vm.currentTo = country;
        } else {
          vm.currentFrom === country ? vm.currentFrom = null : vm.currentFrom = country;
        }

      }

      function getCountries() {

        let countryPromise = CountriesService.getCountryData();

        countryPromise.then(res => {

          if (!res) {
            vm.countriesLoaded = false;
            return;
          }
          vm.countries = res;
          vm.countriesLoaded = true;
        });

      }

    }

  }

)();
