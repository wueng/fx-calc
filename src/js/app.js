angular.module('app', []);
angular.module('app', ['purplefox.numeric'])


angular.module('app').controller('Calc',
    function ($scope, $http) {

         $scope.formOpts = {
            send: {
                amt: 100,
                cur: "SEK",
            },
            receive: {
                amt: 0,
                cur: "GBP",
            }
        }

        // on change calling money.js function to recalculate receive amount
        $scope.calculateReceiveAmt = function () {
            var sendAmt = angular.isNumber($scope.formOpts.send.amt) ? $scope.formOpts.send.amt : 0;
            $scope.formOpts.receive.amt = fx(sendAmt).from($scope.formOpts.send.cur).to($scope.formOpts.receive.cur).toFixed(2);
        }

        $scope.calculateSendAmt = function () {
            var receiveAmt = angular.isNumber($scope.formOpts.receive.amt) ? $scope.formOpts.receive.amt : 0;
            $scope.formOpts.send.amt = fx(receiveAmt).from($scope.formOpts.receive.cur).to($scope.formOpts.send.cur).toFixed(2);
        }

        var init = function () {
            $http.get("https://restcountries.eu/rest/v2/all?fields=name;currencies")
                .then(function (response) {
                    $scope.listOfCountries = response.data;
                    $http.get("https://api.fixer.io/latest?base=USD")
                        .then(function (responseRates) {
                            fx.rates = responseRates.data.rates;
                            $scope.listOfRates = responseRates.data.rates;

                            var count = 1;
                            $scope.listOfCountriesWithRates = [];
                  
                            $scope.listOfCountriesWithRates =   $scope.listOfCountries.filter(function(country){
                                var code = country.currencies[0].code;
                                return  $scope.listOfRates[code];   
                            });

                            $scope.calculateReceiveAmt();
                        });
                });
        }

        init();

        //debugging     
        var onChange = function (newValue, oldValue) {
            console.log(oldValue, newValue);
        };

        // $scope.$watch('formOpts', onChange, true);
        // $scope.$watch('listOfCountries', onChange, true);

        //debugging
    }
)
