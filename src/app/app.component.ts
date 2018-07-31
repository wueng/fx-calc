import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidInput } from './validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public options = [];
  public options2 = [];
  public fromCountry: any;
  public fromCountryCurrCode: any;
  public toCountryCurrCode: any;
  public toCountry: any;
  private showInputFields: boolean = false;
  private currencyFormGroup: FormGroup;
  private coversionRate: number = 0;
  private countryAPIUrl = "https://restcountries.eu/rest/v2/all"
  private exchangeAPIUrl = "http://free.currencyconverterapi.com/api/v5/convert?q=";
  private conversionRateJSON: any;
  constructor(private http: Http, private _fb: FormBuilder) {

  }
  ngOnInit() {
    this.getCountryData();
    this.currencyFormGroup = this._fb.group({
      fromCountry: [""],
      toCountry: [{ value: "", disabled: true }],
      fromCountryValue: [""],
      toCountryValue: ["", [Validators.required, ValidInput]]
    });
    this.subscribeToFormChange();
  }
  subscribeToFormChange() {
    this.currencyFormGroup.get("fromCountryValue").valueChanges.subscribe(val => {
      this.currencyFormGroup.get("toCountryValue").reset();
      let newAmount = val * this.coversionRate;
      this.currencyFormGroup.get("toCountryValue").setValue(newAmount.toFixed(2));

    });
    this.currencyFormGroup.get("fromCountry").valueChanges.subscribe(val => {
      this.showInputFields = false;
      this.currencyFormGroup.get("toCountry").patchValue("");
      this.currencyFormGroup.get("fromCountryValue").reset();
      this.currencyFormGroup.get("toCountryValue").reset();
    });
    this.currencyFormGroup.get("toCountry").valueChanges.subscribe(val => {
      this.showInputFields = false;
      this.currencyFormGroup.get("fromCountryValue").reset();
      this.currencyFormGroup.get("toCountryValue").reset();
    });
  }
  onOptionsSelected(event) {
    this.fromCountry = event.name
    this.fromCountryCurrCode = event.currencies[0].code;
    this.currencyFormGroup.get("toCountry").enable()
  }
  onOptionsSelected2(event) {
    if (event !== "") {
      this.toCountry = event.name
      this.toCountryCurrCode = event.currencies[0].code
      this.showInputFields = true;
      this.getExchangeValue();
    }

  }
  getCountryData() {
    this.http.request(this.countryAPIUrl)
      .subscribe((res: Response) => {
        this.options = res.json();
      });
  }
  getExchangeValue() {
    this.http.request(this.exchangeAPIUrl + this.fromCountryCurrCode + "_" + this.toCountryCurrCode)
      .subscribe((res: Response) => {
        this.conversionRateJSON = res.json();
        let abc = this.fromCountryCurrCode + "_" + this.toCountryCurrCode;
        this.coversionRate = this.conversionRateJSON['results'][abc]["val"];
      });
  }
}
