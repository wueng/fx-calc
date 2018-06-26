(function(){
'use strict'
var  currencyFactory =angular.module('currencyFactory',['ng'])
currencyFactory.factory('dataHandler',dataHandler);
dataHandler.$inject=['$q','$http'];
function dataHandler(Q,Http){
return{
currencyConverter:currencyConverter,
getCountryCode :getCountryCode,
getCurrencyCode:getCurrencyCode,
}
function getCountryCode(){

    var deffered =Q.defer();
    var fname="/data/CountryCode.json"
    Http({
        method: 'GET',
        url: fname
     }).then(function (response){
        deffered.resolve(response)
        
     },function (error){
        deffered.reject(error)
        
     })
     return deffered.promise;
         
}
function getCurrencyCode(country){
    var deffered =Q.defer();    
   var fname="/data/CurrencyCode.json"
   Http({
    method: 'GET',
    url: fname
 }).then(function (response){
    deffered.resolve(response)
    
 },function (error){
    deffered.reject(error)
    
 })
 return deffered.promise;
   
}

function currencyConverter(fromCurrency,toCurrency){
    var deffered =Q.defer();    
    var endpoint = 'latest'
    var from=fromCurrency;
    var to=toCurrency;
        Http({
            method: 'GET',
            url: 'https://exchangeratesapi.io/api/' + endpoint + '?base='+from + '&symbols='+to
        }).then(function (response){
            deffered.resolve(response)
         },function (error){
            deffered.reject(error)
         })
     return deffered.promise;         
}       
}

})();