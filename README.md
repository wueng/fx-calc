# FX-Calc 

FX-Calc is a simple, responsive currency exchange application using Bootstrap and AngularJS framework as well as jQuery library. It validates, formats user's input with "angular-numeric-directive" . Uses public API "https://restcountries.eu/rest/v2/all?fields=name;currencies for country list and "https://api.fixer.io/latest?base=USD" for rates list. From these two lists new country list with supported rates is formed and used in receive and send drop down lists.  Karma test runer has been used with Jasmine unit testing framework. Test configurations are set in karma.conf.js file. 

# Setup

Node and npm is required to run the application on //localhost:8080

To setup: run "npm i" in the /fx-calc.
Start application: run "npm run serve".
Tests run: "npm run test".