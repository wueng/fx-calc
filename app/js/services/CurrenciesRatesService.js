(function() {
    angular.module('fxCalculatorApp').service('CurrenciesRatesService', (function()
    {
        CurrenciesRatesService.$inject = ['$http'];

        function CurrenciesRatesService($http)
        {
            this.$http = $http;
            this.setRates();
        }

        CurrenciesRatesService.prototype.setRates = function ()
        {
            this.$http
                .get('http://openexchangerates.org/api/latest.json?app_id=6e2c5f8d96e4430ca5120217f8091afd')
                .then(function(response) {
                    fx.rates = response.data.rates;
                    fx.base = response.data.base;
                });
        };

        CurrenciesRatesService.prototype.convert = function (amount, fromCurrency, toCurrency)
        {
            return fx(amount).from(fromCurrency).to(toCurrency).toFixed(2);
        };

        return CurrenciesRatesService;

    })());

}).call(this);
