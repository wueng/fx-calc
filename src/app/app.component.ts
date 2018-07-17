import { Component } from '@angular/core';
import {CalcStore} from './services/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CURRENCY_URL } from './Data/data.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  calcStore: CalcStore;

  formCountry: string;
  toCountry: string;
  senderAmount: number;
  reciverAmount: number;
  fromCurrencySymbol: string;
  toCurrencySymbol: string;

	constructor(calcStore: CalcStore) {
    this.calcStore = calcStore;
    this.formCountry ="";
    this.toCountry="";
  }
  
  swapCountries(){
    let fromCountry = this.formCountry;
    let toCountry = this.toCountry;
    let senderAmount = this.senderAmount;
    let reciverAmount = this.reciverAmount;

    this.formCountry = toCountry;
    this.toCountry = fromCountry;
    this.senderAmount = reciverAmount;
    this.reciverAmount= senderAmount;
  }

  getValue(){
    console.log(this.formCountry, this.toCountry, this.senderAmount, this.reciverAmount);

    let fromCurrencyfilteredlist = this.calcStore.countryList.filter(x => x.currencyId === this.formCountry);
    if(fromCurrencyfilteredlist.length > 0){
      this.fromCurrencySymbol = fromCurrencyfilteredlist[0].currencySymbol ;
    }
    let toCurrencyfilteredlist = this.calcStore.countryList.filter(x => x.currencyId === this.toCountry);
    if(toCurrencyfilteredlist.length > 0){
      this.toCurrencySymbol = toCurrencyfilteredlist[0].currencySymbol ;
    }
    var that = this;
    if(typeof this.formCountry != 'undefined' && 
        typeof this.toCountry != 'undefined')
    {
      if(this.senderAmount != null && typeof this.senderAmount != 'undefined')
      {
        const fromTo= this.formCountry + '_'+ this.toCountry;
        const reqURL = CURRENCY_URL + fromTo +'&compact=y';
        
        fetch(reqURL).then(function(res){          
            return res.json();
        }).then(function(data:any){
          console.log(data)
            if(typeof data != 'undefined')  
            {
              that.reciverAmount = that.senderAmount *  parseFloat(data[fromTo]['val'])
            }    
            else{
              that.reciverAmount = null;
            }   
            
        }).catch(function(e){
            alert('We are sorry to provide you the required information at this point of time. Please try after 1 hr')
        })      
      }    
     
    }  
  }


}
