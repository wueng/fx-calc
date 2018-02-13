var ForEx= angular.module('ForEx', [])

ForEx.controller("myController",['$scope', '$http', function($scope, $http) {
		//-- scope value initialization
			$scope.countrylist=[];	
			$scope.fromType = '';
			$scope.toType = '';
			$scope.fromValue = "";
			$scope.toValue = "";		
			var exchangelist = new Array();	
			var precisionvalue=2;
			
			//-- to get currency code and exchnage rate
			var successcallbackfunction = function (allcountrydata) {						
				$scope.countrylist = allcountrydata.data;			
				//--API to get exchange rates for 32 currencies only			
				$http.get('http://api.fixer.io/latest?base=ZAR')
				.then(function(res) {				
					var exchangecurrencyrate = res.data.rates;				
					for (excurrate in exchangecurrencyrate) {								
						exchangelist[excurrate] = exchangecurrencyrate[excurrate];			
					}				
				});	
			}	
		
		//-- External json for getting country & currency
		$http.get('CountryToCurrency.json')
			.then(successcallbackfunction);	
			
		//-- country/currency based exchange rate calculation
		$scope.forExConvert = function() {
			var currencyFrom = $scope.fromType;
			var currencyTo = $scope.toType;			
			var exchangerateFrom = (exchangelist && exchangelist[currencyFrom]) ? exchangelist[currencyFrom] : false;
			var exchangerateTo = (exchangelist && exchangelist[currencyTo]) ? exchangelist[currencyTo] : false;			
			if(exchangerateFrom && exchangerateTo){
			$scope.toValue = $scope.fromValue * (exchangerateTo * (1 / exchangerateFrom));
			$scope.toValue = $scope.roundFix($scope.toValue,precisionvalue);
			}else{
			$scope.toValue = "";
			}				
        };
		
		//-- input field validations / allowed upto 3 decimal only
		$scope.validateCurrency = function (){
			var amount = $scope.fromValue;
			var regex = /^[1-9]\d*(\.\d{0,3})?$/;
			var amountvalidate=regex.test(amount);
			if(amountvalidate){
				$scope.forExConvert();
			}else{
				$scope.fromValue="";
			}			
		}
		
		//-- received amount round up
		$scope.roundFix = function(number, precision){
			var multi = Math.pow(10, precision);
			return Math.round( (number * multi).toFixed(precision + 1) ) / multi;
		}
		
	}]);
	
	
