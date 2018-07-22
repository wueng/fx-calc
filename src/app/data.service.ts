import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';

const API_URL = environment.countryAPI;
const FXRATES_API_URL = environment.currencyAPI;

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }
  //API Call to get list of Countries
  getCountries() {
    return this.http.get(API_URL);
  } 
  //API Call to get the FXRate
  getFXRates(from, to){
    return this.http.get(FXRATES_API_URL + "/"+from+"/"+to);
  }
}