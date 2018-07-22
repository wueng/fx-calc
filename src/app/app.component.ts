import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = "FX Calculator";
  public countries;
  public fromCode = {
    code:"",
    symbol:""
  };
  public toCode = {
    code:"",
    symbol:""
  };
  public selected = {
    code:"",
    symbol:""
  };
  public rate;
  public fxRate;
  public send; public receive;
  public fxError = false;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.getCountries();
  }
  //Call a service method to invoke API call to get the Countries List
  getCountries() {
    this._dataService.getCountries().subscribe(
      data => { this.countries = data},
      err => console.error(err),
      () => console.log('Done loading countries')
    );
  }
  //Call a service method to invoke API call to get the FXRates
  getFXRate(){
    if(this.fromCode && this.fromCode.code != "" && this.fromCode.code != null && this.toCode && this.toCode.code != "" && this.toCode.code != null){
      this._dataService.getFXRates(this.fromCode.code, this.toCode.code).subscribe(
        data => {
          this.fxRate = data;
          if(this.fxRate.result == 'error'){
            this.fxError = true;
          }else{
            this.fxError = false;
          }
          this.rate = this.fxRate.rate;
          console.log(data);
        },
        err => console.error(err),
        () => {
          this.convertCurrency(3);
        }
      );
    }
  }
  //Operator: 1 to convert send amount, 2 to convert receive amount & 3 for OnFXRate Change
  convertCurrency(operator){
    //Check if the send, receive and fxRate are number
    if(this.rate && !isNaN(this.rate) && this.rate != null){
      if(operator === 1 && this.send != null && !isNaN(this.send)){
        this.receive = this.send * this.rate;
      }else if(operator === 2 && this.receive != null && !isNaN(this.receive)){
        this.send = this.receive / this.rate;
      }else if(operator === 3){
        if(this.send != null && !isNaN(this.send)){
          this.receive = this.send * this.rate;
        }else if(this.receive != null && !isNaN(this.receive)){
          this.send = this.receive / this.rate;
        }
      }
    }
  }
  //Method to compare Option values in Select
  compareFn(a,b) {
    return a && b && a.code === b.code;
  }
}