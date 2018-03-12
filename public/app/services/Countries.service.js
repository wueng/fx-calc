'use strict';

(function () {

  function CountriesService($http, $q) {

    const url = 'https://restcountries.eu/rest/v2/all';

    const me = {};
    const neededProps = ['alpha2Code', 'currencies', 'demonym', 'name'];

    return _.assign(me, {
      getCountryData: getCountryData
    });

    /*
     Functions
     */

    function getCountryData() {

      let countryPromise = getCountriesFromUrl();

      return countryPromise.then(res => {
        return processData(res);
      }).catch(err => {
        return processData(err);
      });

    }

    /*
    Private Functions
    */

    function getCountriesFromUrl() {

      let getPromise = $http({
        method: 'GET',
        url: url
      });

      return $q.resolve(getPromise);

    }

    function processData(data) {

      if (_.get(data, 'status') === 404) {
        return [];
      }

      let promiseData = _.get(data, 'data');

      promiseData = _.map(promiseData, country => {

        let obj = {};

        _.each(neededProps, propName => {

          if (propName === 'currencies') {
            let currency = _.get(country, propName);

            let currencyCode = _.get(currency, '0.code');

            if (currencyCode === null || currencyCode === '(none)') {
              obj[propName] = new Array(currency[1]);
            } else {
              obj[propName] = new Array(currency[0]);
            }

            return;
          }

          obj[propName] = _.get(country, propName);
        });

        return obj;

      });

      promiseData = _.sortBy(promiseData, [function (o) {
        return o.alpha2Code;
      }]);

      //:TODO simulate long loading for demo purposes, could be omitted;

      //return $timeout(1000).then(() => promiseData);

      return promiseData;

    }

  }

  angular.module('app')
    .service('CountriesService', CountriesService);

})();
