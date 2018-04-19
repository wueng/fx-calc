(function() {
    angular.module('fxCalculatorApp').service('CountriesService', (function()
    {
        CountriesService.$inject = ['$http'];

        function CountriesService($http)
        {
            this.$http = $http;
            this.countries = [];
        }

        CountriesService.prototype.getCountries = function ()
        {
            if (this.countries.length > 0) {
                return this.countries;
            }

            (function(_this) {
                _this.$http
                    .get('https://restcountries.eu/rest/v2/all?fields=alpha2Code;name;currencies;')
                    .then(function(response) {
                        angular.forEach(
                            response.data,
                            function(country) {
                                this.push({
                                    code: country['alpha2Code'],
                                    name: country['name'],
                                    currencyCode: country['currencies'][0]['code']
                                });
                            },
                            _this.countries
                        );
                    });
            })(this);

            return this.countries;
        };

        return CountriesService;

    })());

}).call(this);
