getCurrencyList();
const CURRDECIMAL = 2;
var currency = '';

$(document).ready(function(){
	$('#sendSelection, #receiveSelection').change(function() {
		// update icon for Sender
		$(this).parent().find('div').empty();
		$(this).parent().find('div').append($(this).parent().find('select option:selected').attr('icon'));
		// update currency on different selection
		/*
		if($(this).attr("id") == "sendSelection"){
			calculationSend();
		}else{
			calculationReceive();
		}
		*/
		// I think previous implementation was a bit confusing for user in terms of functionality
		// so I decided on a better solution below:
		calculationSend();
		// Sending Input field will only change when interacting with #receiveCurrInput
	})

	
	$('#sendCurrInput, #receiveCurrInput').keyup(function(e){
		//limit only for numeric characters
		if((e.which > 47)&&(e.which < 57)||(e.which > 95)&&(e.which < 105)){
			var actualValue = parseFloat($(this).val())*10;
			$(this).val(parseFloat(actualValue).toFixed(CURRDECIMAL));
		//control pasting text or when nothing is entered
		}else if((isNaN($(this).val()))){
			$(this).val(parseFloat('0.00'));
		//controlling backspace
		}else if(e.which == 8){
			if($(this).val()==''){
				$(this).val(parseFloat('0.00'));
			}
			var actualValue = parseFloat($(this).val())/10;
			$(this).val(parseFloat(actualValue).toFixed(CURRDECIMAL));
		//just make sure that anything that was entered is parsed to control the datatype.
		}else{
			console.log('Invalid Characters detected');
			$(this).val(parseFloat($(this).val()).toFixed(CURRDECIMAL));
		}
		console.log(e.which);
		
		// after initialisation is done calculate
		if($(this).attr("id") == 'sendCurrInput'){
			calculationSend();
		}else{
			calculationReceive();
		}
	});
});

function initIconHolder(sel){
	$(sel).append($('#sendSelection option:selected').attr('icon'));
}

function getCurrencyList(){
	 var urlCurrencyRate = 'https://api.fixer.io/latest';
	 var urlCurrencyCountry = 'https://gist.githubusercontent.com/Fluidbyte/2973986/raw/b0d1722b04b0a737aade2ce6e055263625a0b435/Common-Currency.json';
	 var currencyList = '';
	 var countryCodeList = '';
	 var CplusCList = '';
	 $.getJSON( urlCurrencyRate, function( json ) {// getting Currency data
		currencyList = json;
		//console.log(currencyList);
		$.getJSON( urlCurrencyCountry, function( json ) {// getting country code associated with currency
			countryCodeList = json;
			//console.log(countryCodeList);
			CplusCList = createCurrencyPlusCountryList(currencyList,countryCodeList);
			add2Option(CplusCList,'#sendSelection','#currSendIcon');
			add2Option(CplusCList,'#receiveSelection','#currReceiveIcon');
		});
	 });
}

function add2Option(CPCList, selector,icon){
	for(var i = 0; i < CPCList.length; i++){
		$(selector).append('<option icon="'+CPCList[i].icon+'" value="'+CPCList[i].value+'">'+CPCList[i].code+' | '+CPCList[i].name+'</option>');
	}
	$(selector).append('<option icon="€" value="1">EUR | Euro</option>');
	initIconHolder(icon);
}

function createCurrencyPlusCountryList(cL, cCL){
	var newList = [];
	$.each(cL.rates, function(currCode,currValue){
		$.each(cCL, function(currSearchCode,details){
			if (currCode == currSearchCode){
				var item = {code:currCode,name:details.name,value:currValue,icon:details.symbol_native};
				//console.log(item);
				newList.push(item)
			}
		});
	});
	return newList;
}


// these two last functions are very similar 
function calculationSend(){
	//since the calculation is based on a EUR I need to devide and multiple after
	var sendC = parseFloat($('#sendSelection option:selected').val());
	var receiveC = parseFloat($('#receiveSelection option:selected').val());
	var currResult = parseFloat($('#sendCurrInput').val())/sendC*receiveC
	$('#receiveCurrInput').val(currResult.toFixed(CURRDECIMAL));
}
function calculationReceive(){
	var sendC = parseFloat($('#sendSelection option:selected').val());
	var receiveC = parseFloat($('#receiveSelection option:selected').val());
	var currResult = parseFloat($('#receiveCurrInput').val())/receiveC*sendC
	$('#sendCurrInput').val(currResult.toFixed(CURRDECIMAL));
}
