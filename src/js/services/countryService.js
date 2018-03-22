angular.module('fxCalc')
	.service('countryService', [
		'$http',
		function ($http) {

			// A method for retrieving a list of countries
			this.getCountryList = function() {
				// Define request parameters
				// We will be using a JSON containing the data for all countries, and while it contains a lot of unnecessary data, it is worth it, because
				// the currency data is already linked to the country data (we don't have to do that ourselves) and since this is not production code - 
				// the size of the data used is not as important.
				var _requestParams = {
					url: 'https://restcountries.eu/rest/v2/all',	
					method: 'GET',
					cache: true
				};

				// And return a promise for the data
				return $http(_requestParams);
			};

			
		}]);