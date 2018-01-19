getCurrencyList();
$(document).ready(function(){

$('#sendCurrInput').keyup(function(e){
	//limit only for numeric characters
	if((e.which > 48)&&(e.which < 57)||(e.which > 96)&&(e.which < 105)){
		var actualValue = parseFloat($('#sendCurrInput').val())*10;
		$('#sendCurrInput').val(parseFloat(actualValue).toFixed(2));
	//control pasting text or when nothing is entered
	}else if((isNaN($('#sendCurrInput').val()))){
		$('#sendCurrInput').val(parseFloat('0.00'));
	//controlling backspace
	}else if(e.which == 8){
		if($('#sendCurrInput').val()==''){
			$('#sendCurrInput').val(parseFloat('0.00'));
		}
		var actualValue = parseFloat($('#sendCurrInput').val())/10;
		$('#sendCurrInput').val(parseFloat(actualValue).toFixed(2));
	//just make sure that anything that was entered is parsed to control the datatype.
	}else{
		console.log('Invalid Characters detected');
		$('#sendCurrInput').val(parseFloat($('#sendCurrInput').val()).toFixed(2));
		
		//console.log(parseFloat($('#sendCurrInput').val()).toFixed(2));
	}
	console.log(e.which);
	
});

});
var currency = '';

function getCurrencyList(){
	 var urlCurrencyRate = 'https://api.fixer.io/latest';
	 var urlCurrencyCountry = 'https://gist.githubusercontent.com/Fluidbyte/2973986/raw/b0d1722b04b0a737aade2ce6e055263625a0b435/Common-Currency.json';
	 var currencyList = '';
	 var countryCodeList = '';
	 var CplusCList = '';
	 $.getJSON( urlCurrencyRate, function( json ) {// getting Currency data
		currencyList = json;
		console.log(currencyList);
		$.getJSON( urlCurrencyCountry, function( json ) {// getting country code associated with currency
			countryCodeList = json;
			CplusCList = createCurrencyPlusCountryList(currencyList,countryCodeList);
			console.log(CplusCList);
			addtoOptionSend(CplusCList);
		});
	 });
}

function addtoOptionSend(CPCList){
	for(var i = 0; i < CPCList.length; i++){
		$('#sendSelection').append('<option icon="'+CPCList[i].icon+'" value="'+CPCList[i].value+'">'+CPCList[i].code+' | '+CPCList[i].name+'</option>');
	}

}

function createCurrencyPlusCountryList(cL, cCL){
	var newList = [];
	$.each(cL.rates, function(currCode,currValue){
		$.each(cCL, function(currSearchCode,details){
			if (currCode == currSearchCode){
				//console.log(currCode+' '+details.name+' '+currValue);
				item = {code:currCode,name:details.name,value:currValue,icon:details.symbol_native};
				newList.push(item)
			}
		});
	});
	return newList;
}

