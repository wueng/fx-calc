(function() {
    angular.module('fxCalculatorApp').controller('MainController', (function()
    {
        MainController.$inject = ['CountriesService', 'CurrenciesRatesService'];

        function MainController(CountriesService, CurrenciesRatesService)
        {
            this.countries = CountriesService.getCountries();
            this.CurrenciesRatesService = CurrenciesRatesService;
        }

        MainController.prototype.calculateReceiverAmount = function ()
        {
            if (!this.senderAmount || !this.sender.currencyCode || !this.receiver.currencyCode) {
                return;
            }

            this.receiverAmount = this.CurrenciesRatesService.convert(
                this.senderAmount,
                this.sender.currencyCode,
                this.receiver.currencyCode
            );
        };

        return MainController;

    })());

}).call(this);
