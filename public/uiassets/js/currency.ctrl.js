app.controller('currencyController',['$scope','dataHandler', function($scope,dataHandler) {
    $scope.fromCountry;
    $scope.fromCountries;
    $scope.toCountry ;
    $scope.toCountries;
    $scope.fromCurrency;
    $scope.toCurrency;
    $scope.sAmount=0.0;
    $scope.rAmount=0.0;
    $scope.disabled=true;

    dataHandler.getCountryCode().then(function(response){
        $scope.fromCountries=response.data;
        $scope.toCountries=response.data;
    })
    
    $scope.findCurrency = function(value) {
        $scope.sAmount=0.0;
        $scope.rAmount=0.0;
        if( $scope.fromCountry !=undefined && $scope.toCountry !=undefined){
            $scope.disabled=false;
        }
        else {
            $scope.disabled=true;     
        }
     dataHandler.getCurrencyCode().then(function(response){
         if (value=="from")
         $scope.fromCurrency = response.data[$scope.fromCountry]; 
         else
         $scope.toCurrency = response.data[$scope.toCountry]; 
     })
     }
     
    $scope.Convert = function(value) {

            if ( $scope.fromCountry !=undefined && $scope.toCountry !=undefined ){
                if(value=='direct')
                $scope.directCurrency()
                else
                 $scope.reverseConversion()
                
            }
            else {  
                $scope.sAmount=0.0;
                $scope.rAmount=0.0;
            
            }
         }

    $scope.directCurrency = function() {
                     dataHandler.currencyConverter($scope.fromCurrency,$scope.toCurrency).then(function(response){
                         if(response.statusText="OK"){
                            var cRates=response.data.rates;
                            var  ratesValue =cRates[$scope.toCurrency]
                           if(ratesValue!=undefined){
                            $scope.rAmount=parseFloat($scope.sAmount) *parseFloat(ratesValue)
                           }
                         }    
                         else {

                            alert(response.data.error)
                         }
                    },function (error){
                        if($scope.sAmount || $scope.sAmount==0.0)
                        alert(error.data.error)
                    })
        }
    
    $scope.reverseConversion = function() {
            dataHandler.currencyConverter($scope.toCurrency,$scope.fromCurrency).then(function(response){
                if(response.statusText="OK"){
                   var cRates=response.data.rates;
                   var  ratesValue =cRates[$scope.fromCurrency]
                  if(ratesValue!=undefined){
                   $scope.sAmount=parseFloat($scope.rAmount)*parseFloat(ratesValue)
                  }
                }    
                else {
                   alert(response.data.error)
                }
           },function (error){

           })
}

$scope.myFunction = function(keyEvent,value) {
    if (!((keyEvent.keyCode>=48 && keyEvent.keyCode<=57) || keyEvent.keyCode==46) )
        {
            alert("Please provide valid input");
            if(value=="send")
                {
                $scope.sAmount=0.0;   
                }
            else{
                $scope.rAmount= 0.0;
            }
        }     
  }
  





  }]);