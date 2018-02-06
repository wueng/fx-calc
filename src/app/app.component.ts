import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loadedCountries: CountryInfo[];
  countries: CountryInfo[] = [{ name: "Loading", currency: "" }];

  baseCurrency: string;
  ratiosDate: string;
  rates: ExchangeRate[];

  fromCountryIndex = 0;
  fromAmountCents_temporary = 0;
  fromAmountCents = 0;
  fromRatio = 0;

  toCountryIndex = 0;
  toAmountCents_temporary = 0;
  toAmountCents = 0;
  toRatio = 0;

  ratioIsIndirect = false;

  lastChangeIsBackwards = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    // get exchange rates from http://fixer.io/
    let exchangesRatesRequest = this.http.get<ExchangeRatesResponse>("https://api.fixer.io/latest");
    exchangesRatesRequest.subscribe(this.didLoadExchangeRates.bind(this), this.didFailToLoad.bind(this));

    // get country list from https://restcountries.eu/
    let countriesRequest = this.http.get<CountryInfoResponse[]>("https://restcountries.eu/rest/v2/all?fields=name;currencies");
    countriesRequest.subscribe(this.didLoadCountryList.bind(this), this.didFailToLoad.bind(this));

  }

  didLoadExchangeRates(data: ExchangeRatesResponse) {
    try {
      this.baseCurrency = data.base;
      this.ratiosDate = data.date;
      let rates = data.rates;
      this.rates = Object.keys(rates).map(code => { return { target: code, ratio: rates[code] }; } );
      if (this.loadedCountries) { this.didLoadAllData(); }
    } catch (error) {
      alert("Error: invalid format of loaded data.");
    }
  }

  didLoadCountryList(data) {
    try {
      this.loadedCountries = data.map(info => { return { name: info.name, currency: info.currencies[0]["code"] }; });
      if (this.rates) { this.didLoadAllData(); }
    } catch (error) {
      alert("Error: invalid format of loaded data.");
    }

  }

  didFailToLoad(error) {
    alert("Error: failed to load data. Please check your network connection.");
  }

  didLoadAllData() {

    let rates = this.rates;
    let baseCurrency = this.baseCurrency;

    function hasCurrency(code) {
      if (code == baseCurrency) { return true; }
      for (let exchangeRate of rates) {
        if (exchangeRate.target == code) { return true; }
      }
      return false;
    }

    this.countries = this.loadedCountries.filter(item => hasCurrency(item.currency));
    this.loadedCountries = null;

    this.didChangeCountry();

  }

  findExchangeRate(targetCode: string): ExchangeRate {
    for (let exchangeRate of this.rates) {
      if (exchangeRate.target == targetCode) { return exchangeRate; }
    }
    return null;
  }

  didChangeCountry() {

    // get currency codes
    let fromCode = this.countries[this.fromCountryIndex].currency;
    let toCode = this.countries[this.toCountryIndex].currency;

    this.ratioIsIndirect = false;

    // find exchange ratios
    if (fromCode == toCode) {
      this.fromRatio = 1;
      this.toRatio = 1;
    } else if (fromCode == this.baseCurrency) {
      let exchange = this.findExchangeRate(toCode);
      this.fromRatio = exchange.ratio;
      this.toRatio = 1 / exchange.ratio;
    } else if (toCode == this.baseCurrency) {
      let exchange = this.findExchangeRate(fromCode);
      this.fromRatio = 1 / exchange.ratio;
      this.toRatio = exchange.ratio;
    } else {
      let toBase = 1 / this.findExchangeRate(fromCode).ratio;
      this.toRatio = toBase * this.findExchangeRate(toCode).ratio;
      this.fromRatio = 1 / this.toRatio;
      this.ratioIsIndirect = true;
    }

    // update values
    if (this.lastChangeIsBackwards) {
      this.didChangeTo({ target: document.getElementById("toInput") });
    } else {
      this.didChangeFrom({ target: document.getElementById("fromInput") });
    }

  }

  didChangeFrom($event) {
    let inputCents = Math.round($event.target.value * 100);
    if (isNaN(inputCents)) { return; }
    this.fromAmountCents_temporary = inputCents;
    this.toAmountCents = Math.round(inputCents * this.fromRatio);
    this.lastChangeIsBackwards = false;
  }

  didChangeTo($event) {
    let inputCents = Math.round($event.target.value * 100);
    if (isNaN(inputCents)) { return; }
    this.fromAmountCents = Math.round(inputCents * this.toRatio);
    this.toAmountCents_temporary = Math.round(inputCents);
    this.lastChangeIsBackwards = true;
  }

  didFinishEditingFrom() {
    this.fromAmountCents = this.fromAmountCents_temporary;
  }

}

export interface ExchangeRatesResponse {
  base: string;
  date: string;
  rates: Object;
}

export interface CountryInfoResponse {
  name: string;
  currencies: Object[];
}

export interface ExchangeRate {
  target: string;
  ratio: number;
}

export interface CountryInfo {
  name: string;
  currency: string;
}
