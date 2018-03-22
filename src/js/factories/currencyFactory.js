angular.module('fxCalc')
  .factory('currencyFactory', [
    '$q', 'exchangeRateService',
    function ($q, exchangeRateService) {

        // Define the currency class
        class Currency {
            // Constructor
            constructor(pCountryData) {
               // Instantiate a class instance
               // And since we have an over-abundance of data, feel free to loose some
               this.countryNumericCode = pCountryData.numericCode;
               this.countryName = pCountryData.name;

               // Due to the possibility that a country has more than one official currency, assume the first element of the array is the default.
               this.currencyCode = pCountryData.currencies[0].code;
               this.currencyName = pCountryData.currencies[0].name;
               this.currencySymbol = pCountryData.currencies[0].symbol;

               // Amount
               this.amount = 0;
            }

            // Methods
            convertTo(pTargetCurrencyCode) {
                // Create a reference to the class object, so that we don't loose it when within a promise
                var _self = this;

                // This is where the actual conversion will happen.
                // Now, in order to make the conversion, we need to have the conversion rates
                // Request them and return a promise
                return exchangeRateService.getExchangeRate(_self.currencyCode, pTargetCurrencyCode)
                    .then(function (result) {
                        // Slight shortcut
                        let _rates = result.data.rates;                        
                        
                        // Now that we have rates available
                        // Lets make the actual calculations
                        // Convert amount to intermediary currency (EUR) and then to the target currency
                        return parseFloat(
                            ((_self.amount / _rates[_self.currencyCode]) * _rates[pTargetCurrencyCode]).toFixed(2)
                        );
                    })
                    .catch(function (result) {
                        // Exception handling should go here
                        console.log('Caught exception while converting amounts');
                        console.log(result);
                        return $q.reject(result);
                    })
            }
        };

        // Define currency methods
        function constructCurrencyList(pCountryData) {
            // Construct an array of class instances
            // Account for possibility of countries without currencies
            var _resultArray = [];

            pCountryData.forEach(x => {
                if (x.currencies.length > 0) {
                    _resultArray.push(new Currency(x));
                }
            });

            return _resultArray
        }

        // Expose factory methods
        return {
            constructCurrencyList: constructCurrencyList
        };
}]);