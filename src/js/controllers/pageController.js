angular.module('fxCalc')
	.controller('pageController', [
		'$scope', 'countryService', 'currencyFactory',
		function ($scope, countryService, currencyFactory) {

			// Data
			$scope.currencies;

			// Page internal variables
			$scope.selectedCurrencies = {
				fromCurrency: null,
				toCurrency: null
			};

			// Options
			$scope.pageOptions = {
				pageReady: false
			};

			// Event handlers
			// An event handler called once a currency is changed
			$scope.onCurrencyChanged = function () {
				// Once one of the currencies has been changed, we need to recalculate the result
				// Now, since we have two editable fields (from amount, to amount) - we need to assume that the user can change the from amount
				// and the to amount will change correspondingly. 
				// In case of a currency change, that however will not work properly:
				// Imagine a scenario, where user converts 100 USD to EUR, then changes the TO CURRENCY to BYR, and the system automatically recalculates
				// how many USD is 100 BYR. Definitely not user friendly.
				// So in such a case, it would be probably wise to assume, that the recalculation should always be done for the from currency.

				// Do we have both currencies selected?
				if (!$scope.selectedCurrencies.fromCurrency || !$scope.selectedCurrencies.toCurrency) {
					return;
				}

				// Calculate amounts
				$scope.selectedCurrencies.fromCurrency.convertTo($scope.selectedCurrencies.toCurrency.currencyCode)
					.then(function (result) {
						// Set the calculated value
						$scope.selectedCurrencies.toCurrency.amount = result;
					})
			};

			// An event handler called once an entered amount is changed
			$scope.onAmountChanged = function (pCaller) {
				// Do we have both currencies selected?
				if (!$scope.selectedCurrencies.fromCurrency || !$scope.selectedCurrencies.toCurrency) {
					return;
				}

				// Now in this case, we need to know who is the caller, so that we know which amount to recalculate
				var _toCurrency;
				var _fromCurrency;
				
				for (var _propertyName in $scope.selectedCurrencies) {
					if (_propertyName === pCaller) {
						// Set the from currency
						_fromCurrency = $scope.selectedCurrencies[_propertyName];
					}
					else {
						// Set the to currency
						_toCurrency = $scope.selectedCurrencies[_propertyName];
					}
				}

				// And calculate
				_fromCurrency.convertTo(_toCurrency.currencyCode)
					.then(function (result) {
						// Set the calculated value
						_toCurrency.amount = result;
					})
			};

			// A init function
			this.$onInit = function() {
				// What should we do to initialize the page?
				// Get the country data
				countryService.getCountryList()
					.then(function (result) {
						// Construct a list of currencies
						$scope.currencies = currencyFactory.constructCurrencyList(result.data);
					})
					.catch(function (result) {
						console.log('An exception was caught while trying to fetch country data');
						console.log(result);
					})
			}
		}]);