angular.module('fxCalc')
	.service('exchangeRateService', [
		'$http',
		function ($http) {

			// API key
			var _apiKey = 'f2cb681e88d201249423de1ac3b87bbf';

			// A method for retrieving the exchange rate for the specific currency
			// We will be using data provided by fixer.io
			this.getExchangeRate = function(pFromCurrencyCode, pToCurrencyCode) {
				// Define request parameters
				// Fixer can provide exchange rates from a single base currency to a list of currencies
				// The problem is, that the free subscription only allows for the base currency to be EUR
				// And while its not correct (as we use incorrect rates), we are going to work around that, by converting amounts into EUR, before converting them to a target currency

				// Define a request
				var _requestParams = {
					url: 'http://data.fixer.io/api/latest',	
					method: 'GET',
					params: {
						access_key: _apiKey,
						base: 'EUR',
						symbols: pFromCurrencyCode + ',' + pToCurrencyCode
					},
					cache: true
				};

				// And return a promise for the data
				return $http(_requestParams);
			};

			
		}]);