/* Construction test */
describe('Testing currency factory', function () {

	var _factory;
	var _mockExchangeRateService;
	var _q;
	var _rootScope;

	// Set-up for angularJs
	beforeEach(function () {
		module('fxCalc');

		inject(function($injector) {
      		_factory = $injector.get('currencyFactory');
      		_q = $injector.get('$q');
      		_rootScope = $injector.get('$rootScope');
      		_mockExchangeRateService = $injector.get('exchangeRateService');
    	});
	});

	// Specs
	it('Should create a list of class instances based on the provided data', function () {

		// Define test data
		var _testData = [{"name":"Yemen","topLevelDomain":[".ye"],"alpha2Code":"YE","alpha3Code":"YEM","callingCodes":["967"],"capital":"Sana'a","altSpellings":["YE","Yemeni Republic","al-Jumhūriyyah al-Yamaniyyah"],"region":"Asia","subregion":"Western Asia","population":27478000,"latlng":[15.0,48.0],"demonym":"Yemeni","area":527968.0,"gini":37.7,"timezones":["UTC+03:00"],"borders":["OMN","SAU"],"nativeName":"اليَمَن","numericCode":"887","currencies":[{"code":"YER","name":"Yemeni rial","symbol":"﷼"}],"languages":[{"iso639_1":"ar","iso639_2":"ara","name":"Arabic","nativeName":"العربية"}],"translations":{"de":"Jemen","es":"Yemen","fr":"Yémen","ja":"イエメン","it":"Yemen","br":"Iêmen","pt":"Iémen","nl":"Jemen","hr":"Jemen","fa":"یمن"},"flag":"https://restcountries.eu/data/yem.svg","regionalBlocs":[{"acronym":"AL","name":"Arab League","otherAcronyms":[],"otherNames":["جامعة الدول العربية","Jāmiʻat ad-Duwal al-ʻArabīyah","League of Arab States"]}],"cioc":"YEM"},{"name":"Zambia","topLevelDomain":[".zm"],"alpha2Code":"ZM","alpha3Code":"ZMB","callingCodes":["260"],"capital":"Lusaka","altSpellings":["ZM","Republic of Zambia"],"region":"Africa","subregion":"Eastern Africa","population":15933883,"latlng":[-15.0,30.0],"demonym":"Zambian","area":752612.0,"gini":54.6,"timezones":["UTC+02:00"],"borders":["AGO","BWA","COD","MWI","MOZ","NAM","TZA","ZWE"],"nativeName":"Zambia","numericCode":"894","currencies":[{"code":"ZMW","name":"Zambian kwacha","symbol":"ZK"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"}],"translations":{"de":"Sambia","es":"Zambia","fr":"Zambie","ja":"ザンビア","it":"Zambia","br":"Zâmbia","pt":"Zâmbia","nl":"Zambia","hr":"Zambija","fa":"زامبیا"},"flag":"https://restcountries.eu/data/zmb.svg","regionalBlocs":[{"acronym":"AU","name":"African Union","otherAcronyms":[],"otherNames":["الاتحاد الأفريقي","Union africaine","União Africana","Unión Africana","Umoja wa Afrika"]}],"cioc":"ZAM"},{"name":"Zimbabwe","topLevelDomain":[".zw"],"alpha2Code":"ZW","alpha3Code":"ZWE","callingCodes":["263"],"capital":"Harare","altSpellings":["ZW","Republic of Zimbabwe"],"region":"Africa","subregion":"Eastern Africa","population":14240168,"latlng":[-20.0,30.0],"demonym":"Zimbabwean","area":390757.0,"gini":null,"timezones":["UTC+02:00"],"borders":["BWA","MOZ","ZAF","ZMB"],"nativeName":"Zimbabwe","numericCode":"716","currencies":[{"code":"BWP","name":"Botswana pula","symbol":"P"},{"code":"GBP","name":"British pound","symbol":"£"},{"code":"CNY","name":"Chinese yuan","symbol":"¥"},{"code":"EUR","name":"Euro","symbol":"€"},{"code":"INR","name":"Indian rupee","symbol":"₹"},{"code":"JPY","name":"Japanese yen","symbol":"¥"},{"code":"ZAR","name":"South African rand","symbol":"Rs"},{"code":"USD","name":"United States dollar","symbol":"$"},{"code":"(none)","name":null,"symbol":null}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"},{"iso639_1":"sn","iso639_2":"sna","name":"Shona","nativeName":"chiShona"},{"iso639_1":"nd","iso639_2":"nde","name":"Northern Ndebele","nativeName":"isiNdebele"}],"translations":{"de":"Simbabwe","es":"Zimbabue","fr":"Zimbabwe","ja":"ジンバブエ","it":"Zimbabwe","br":"Zimbabwe","pt":"Zimbabué","nl":"Zimbabwe","hr":"Zimbabve","fa":"زیمباوه"},"flag":"https://restcountries.eu/data/zwe.svg","regionalBlocs":[{"acronym":"AU","name":"African Union","otherAcronyms":[],"otherNames":["الاتحاد الأفريقي","Union africaine","União Africana","Unión Africana","Umoja wa Afrika"]}],"cioc":"ZIM"}];

		// Call the function
		var _result = _factory.constructCurrencyList(_testData);

		// Check outputs
		for (var i = 0; i < _result.length; i++) {
			expect(_result[i].countryName).toEqual(_testData[i].name);
			expect(_result[i].countryNumericCode).toEqual(_testData[i].numericCode);
			expect(_result[i].currencyCode).toEqual(_testData[i].currencies[0].code);
			expect(_result[i].currencyName).toEqual(_testData[i].currencies[0].name);
			expect(_result[i].currencySymbol).toEqual(_testData[i].currencies[0].symbol);
			expect(_result[i].amount).toEqual(0);
			expect(_result[i].convertTo).not.toBe(undefined);
		}
	});

	it('Should ignore countries without currencies', function () {

		// Define test data
		var _testData = [{"name":"Yemen","topLevelDomain":[".ye"],"alpha2Code":"YE","alpha3Code":"YEM","callingCodes":["967"],"capital":"Sana'a","altSpellings":["YE","Yemeni Republic","al-Jumhūriyyah al-Yamaniyyah"],"region":"Asia","subregion":"Western Asia","population":27478000,"latlng":[15.0,48.0],"demonym":"Yemeni","area":527968.0,"gini":37.7,"timezones":["UTC+03:00"],"borders":["OMN","SAU"],"nativeName":"اليَمَن","numericCode":"887","currencies":[],"languages":[{"iso639_1":"ar","iso639_2":"ara","name":"Arabic","nativeName":"العربية"}],"translations":{"de":"Jemen","es":"Yemen","fr":"Yémen","ja":"イエメン","it":"Yemen","br":"Iêmen","pt":"Iémen","nl":"Jemen","hr":"Jemen","fa":"یمن"},"flag":"https://restcountries.eu/data/yem.svg","regionalBlocs":[{"acronym":"AL","name":"Arab League","otherAcronyms":[],"otherNames":["جامعة الدول العربية","Jāmiʻat ad-Duwal al-ʻArabīyah","League of Arab States"]}],"cioc":"YEM"},{"name":"Zambia","topLevelDomain":[".zm"],"alpha2Code":"ZM","alpha3Code":"ZMB","callingCodes":["260"],"capital":"Lusaka","altSpellings":["ZM","Republic of Zambia"],"region":"Africa","subregion":"Eastern Africa","population":15933883,"latlng":[-15.0,30.0],"demonym":"Zambian","area":752612.0,"gini":54.6,"timezones":["UTC+02:00"],"borders":["AGO","BWA","COD","MWI","MOZ","NAM","TZA","ZWE"],"nativeName":"Zambia","numericCode":"894","currencies":[{"code":"ZMW","name":"Zambian kwacha","symbol":"ZK"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"}],"translations":{"de":"Sambia","es":"Zambia","fr":"Zambie","ja":"ザンビア","it":"Zambia","br":"Zâmbia","pt":"Zâmbia","nl":"Zambia","hr":"Zambija","fa":"زامبیا"},"flag":"https://restcountries.eu/data/zmb.svg","regionalBlocs":[{"acronym":"AU","name":"African Union","otherAcronyms":[],"otherNames":["الاتحاد الأفريقي","Union africaine","União Africana","Unión Africana","Umoja wa Afrika"]}],"cioc":"ZAM"},{"name":"Zimbabwe","topLevelDomain":[".zw"],"alpha2Code":"ZW","alpha3Code":"ZWE","callingCodes":["263"],"capital":"Harare","altSpellings":["ZW","Republic of Zimbabwe"],"region":"Africa","subregion":"Eastern Africa","population":14240168,"latlng":[-20.0,30.0],"demonym":"Zimbabwean","area":390757.0,"gini":null,"timezones":["UTC+02:00"],"borders":["BWA","MOZ","ZAF","ZMB"],"nativeName":"Zimbabwe","numericCode":"716","currencies":[{"code":"BWP","name":"Botswana pula","symbol":"P"},{"code":"GBP","name":"British pound","symbol":"£"},{"code":"CNY","name":"Chinese yuan","symbol":"¥"},{"code":"EUR","name":"Euro","symbol":"€"},{"code":"INR","name":"Indian rupee","symbol":"₹"},{"code":"JPY","name":"Japanese yen","symbol":"¥"},{"code":"ZAR","name":"South African rand","symbol":"Rs"},{"code":"USD","name":"United States dollar","symbol":"$"},{"code":"(none)","name":null,"symbol":null}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"},{"iso639_1":"sn","iso639_2":"sna","name":"Shona","nativeName":"chiShona"},{"iso639_1":"nd","iso639_2":"nde","name":"Northern Ndebele","nativeName":"isiNdebele"}],"translations":{"de":"Simbabwe","es":"Zimbabue","fr":"Zimbabwe","ja":"ジンバブエ","it":"Zimbabwe","br":"Zimbabwe","pt":"Zimbabué","nl":"Zimbabwe","hr":"Zimbabve","fa":"زیمباوه"},"flag":"https://restcountries.eu/data/zwe.svg","regionalBlocs":[{"acronym":"AU","name":"African Union","otherAcronyms":[],"otherNames":["الاتحاد الأفريقي","Union africaine","União Africana","Unión Africana","Umoja wa Afrika"]}],"cioc":"ZIM"}];

		// Call the function
		var _result = _factory.constructCurrencyList(_testData);

		// Check outputs
		for (var i = 0; i < _result.length; i++) {
			expect(_result[i].countryName).not.toEqual("Yemen");
		}
	});

	it('Should calculate currency conversions correctly', function () {
		// Define test data
		var _testData = [{"name":"Yemen","topLevelDomain":[".ye"],"alpha2Code":"YE","alpha3Code":"YEM","callingCodes":["967"],"capital":"Sana'a","altSpellings":["YE","Yemeni Republic","al-Jumhūriyyah al-Yamaniyyah"],"region":"Asia","subregion":"Western Asia","population":27478000,"latlng":[15.0,48.0],"demonym":"Yemeni","area":527968.0,"gini":37.7,"timezones":["UTC+03:00"],"borders":["OMN","SAU"],"nativeName":"اليَمَن","numericCode":"887","currencies":[{"code":"YER","name":"Yemeni rial","symbol":"﷼"}],"languages":[{"iso639_1":"ar","iso639_2":"ara","name":"Arabic","nativeName":"العربية"}],"translations":{"de":"Jemen","es":"Yemen","fr":"Yémen","ja":"イエメン","it":"Yemen","br":"Iêmen","pt":"Iémen","nl":"Jemen","hr":"Jemen","fa":"یمن"},"flag":"https://restcountries.eu/data/yem.svg","regionalBlocs":[{"acronym":"AL","name":"Arab League","otherAcronyms":[],"otherNames":["جامعة الدول العربية","Jāmiʻat ad-Duwal al-ʻArabīyah","League of Arab States"]}],"cioc":"YEM"}];
		
		// Call the function
		var _classInstance = _factory.constructCurrencyList(_testData)[0];

		// Set amount
		_classInstance.amount = 100;

		// Create a promise
		var _promise = _q.defer();

		// Spy on an external service call
		spyOn(_mockExchangeRateService, 'getExchangeRate').and.returnValue(_promise.promise);

		// Call the function
		_classInstance.convertTo('USD')
			.then(function (result) {
				// Amount should be (100 / 0.5) * 3 = 600
				expect(result).toEqual(600);
			});

		// Resolve the promise and provide test data
		_promise.resolve({
			data: {"success":true, "timestamp":1521674046, "base":"EUR","date":"2018-03-21","rates":{"YER": 0.5,"USD": 3}} // mock data
		});

		// Call a $digest cycle
		_rootScope.$apply();
	});
});