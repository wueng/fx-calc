getCurrencyList();
var currency = '';

$(document).ready(function(){
	$('#sendSelection').change(function() {
		// update icon for Sender
		$('#currSendIcon').empty();
		$('#currSendIcon').append($('#sendSelection option:selected').attr('icon'));
		
	})
	$('#receiveSelection').change(function() {
		// update icon for Receiver
		$('#currReceiveIcon').empty();
		$('#currReceiveIcon').append($('#receiveSelection option:selected').attr('icon'));
	})
	
	$('#sendCurrInput, #receiveCurrInput').keyup(function(e){
		//limit only for numeric characters
		if((e.which > 48)&&(e.which < 57)||(e.which > 96)&&(e.which < 105)){
			var actualValue = parseFloat($(this).val())*10;
			$(this).val(parseFloat(actualValue).toFixed(2));
		//control pasting text or when nothing is entered
		}else if((isNaN($(this).val()))){
			$(this).val(parseFloat('0.00'));
		//controlling backspace
		}else if(e.which == 8){
			if($(this).val()==''){
				$(this).val(parseFloat('0.00'));
			}
			var actualValue = parseFloat($(this).val())/10;
			$(this).val(parseFloat(actualValue).toFixed(2));
		//just make sure that anything that was entered is parsed to control the datatype.
		}else{
			console.log('Invalid Characters detected');
			$(this).val(parseFloat($(this).val()).toFixed(2));
		}
		console.log(e.which);
		// after initialisation is done calculate
		//console.log($(this).attr("id"));
		if($(this).attr("id") == 'sendCurrInput'){
			calculationSend();
		}else{
			calculationReceive();
		}
		//console.log($(parentNode).find('select option:selected').val());
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
		console.log(currencyList);
		$.getJSON( urlCurrencyCountry, function( json ) {// getting country code associated with currency
			countryCodeList = json;
			CplusCList = createCurrencyPlusCountryList(currencyList,countryCodeList);
			console.log(CplusCList);
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
				//console.log(currCode+' '+details.name+' '+currValue);
				item = {code:currCode,name:details.name,value:currValue,icon:details.symbol_native};
				newList.push(item)
			}
		});
	});
	return newList;
}

function calculationSend(){
	//since the calculation is based on a EUR I need to devide and multiple after
	var sendC = parseFloat($('#sendSelection option:selected').val());
	var receiveC = parseFloat($('#receiveSelection option:selected').val());
	var currResult = parseFloat($('#sendCurrInput').val())/sendC*receiveC
	$('#receiveCurrInput').val(currResult.toFixed(2));
}
function calculationReceive(){
	var sendC = parseFloat($('#sendSelection option:selected').val());
	var receiveC = parseFloat($('#receiveSelection option:selected').val());
	var currResult = parseFloat($('#receiveCurrInput').val())/receiveC*sendC
	$('#sendCurrInput').val(currResult.toFixed(2));
}
