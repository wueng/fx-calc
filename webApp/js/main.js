getCurrencyList();
const CURRDECIMAL = 2; //this controls the number of symbols after decimal. Did not setup initialisation for this.
var testing = false; //In order to see input identification messages for testing change to 'true'
var sendInput = $('#sendCurrInput').val(); 
var receiveInput = $('#receiveCurrInput').val();

// all the user input configuration was based of WUPOS currency input field example.
// Not sure if this is the best practice, but it works in order to avoid invalid entries.

$(document).ready(function(){	
	// upon engaging the input field cursor is throw to the back off it.
	$('input').on('click',function(){
		var input = document.getElementById($(this).attr('id'));
		input.focus();
		input.setSelectionRange($(this).val().length,$(this).val().length);
	});
	
	$('#sendSelection, #receiveSelection').change(function() {
		// update icon for Sender
		$(this).parent().find('div').empty();
		$(this).parent().find('div').append($(this).parent().find('select option:selected').attr('icon'));
		calculationSend();// Sending Input field will only change when interacting with #receiveCurrInput
	})

	
	$('#sendCurrInput, #receiveCurrInput').keyup(function(e){
		//limit only for numeric characters
		if((e.which > 47)&&(e.which < 57)||(e.which > 95)&&(e.which < 105)){
			if(testing)console.log('Valid Number enetered');
			var actualValue = parseFloat($(this).val())*10;
			$(this).val(parseFloat(actualValue).toFixed(CURRDECIMAL));
		
		//control pasting text or when nothing is entered
		}else if(isNaN($(this).val())){
			if(testing)console.log('CTRL+V of illegal text or any other illegal character detected');
			if ($(this).attr('id') == 'sendCurrInput'){
				$(this).val(sendInput);
			}else{
				$(this).val(receiveInput);
			}
			
		//controlling backspace
		}else if(e.which == 8){
			if(testing)console.log('Backspace detected');
			if($(this).val()==''){
				$(this).val(parseFloat('0.00'));
			}
			var actualValue = parseFloat($(this).val())/10;
			$(this).val(parseFloat(actualValue).toFixed(CURRDECIMAL));
			
		//just make sure that anything invalidly entered would be returned as a previous value.
		}else{
			if(testing)console.log('Invalid Characters detected');
			$(this).val(parseFloat($(this).val()).toFixed(CURRDECIMAL));
			/*if ($(this).attr('id') == 'sendCurrInput'){
				console.log(sendInput)
				$(this).val(sendInput);
			}else{
				console.log(receiveInput)
				$(this).val(receiveInput);
			}*/
		}
		if($(this).val() == Infinity){
			$(this).val(parseFloat('0.00'));
		}
		//console.log(e.which);
		
		// after initialisation is done calculate
		if($(this).attr("id") == 'sendCurrInput'){
			calculationSend();
		}else{
			calculationReceive();
		}
	});
});

function initIconHolder(sel){
	/*
	$(sel).empty();
	$(sel).append($('#sendSelection option:selected').attr('icon'));
	*/
	$(sel).parent().find('div').empty();
	$(sel).parent().find('div').append($(sel).parent().find('select option:selected').attr('icon'));
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
			add2Option(CplusCList,'#sendSelection');
			//initialisation for first option to be selected as EURO.
			$("#sendSelection option:last").attr("selected", "selected");
			initIconHolder('#sendSelection');
			add2Option(CplusCList,'#receiveSelection');
		});
	 }).fail(function() { alert('This application has lost connection to internet or the to source of information, '
		+'could you please try checking your connectivity or this link reachablity: https://api.fixer.io/latest . '
		+'\n\nThis is a legit message that was thought through by Jefim and implemented/tested specifically for show off.' 
		+'\n\nIn order to be able to test this functionality try to disable your internet or rip out the internet cord from your computer :)')});
}

function add2Option(CPCList, selector){
	for(var i = 0; i < CPCList.length; i++){
		$(selector).append('<option icon="'+CPCList[i].icon+'" value="'+CPCList[i].value+'">'+CPCList[i].code+' | '+CPCList[i].name+'</option>');
	}
	$(selector).append('<option icon="€" value="1">EUR | Euro</option>');
	initIconHolder(selector);
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

// These two last functions are very similar, but cannot afford extra time to optimize.
function calculationSend(){
	//since the calculation is based on a EUR I need to devide and multiple after
	var sendC = parseFloat($('#sendSelection option:selected').val());
	var receiveC = parseFloat($('#receiveSelection option:selected').val());
	var currResult = parseFloat($('#sendCurrInput').val())/sendC*receiveC
	$('#receiveCurrInput').val(currResult.toFixed(CURRDECIMAL));
	sendInput = $('#sendCurrInput').val();
	receiveInput = $('#receiveCurrInput').val();
}

function calculationReceive(){
	var sendC = parseFloat($('#sendSelection option:selected').val());
	var receiveC = parseFloat($('#receiveSelection option:selected').val());
	var currResult = parseFloat($('#receiveCurrInput').val())/receiveC*sendC
	$('#sendCurrInput').val(currResult.toFixed(CURRDECIMAL));
	sendInput = $('#sendCurrInput').val();
	receiveInput = $('#receiveCurrInput').val();
}