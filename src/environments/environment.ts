// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  
  countryAPI: 'https://restcountries.eu/rest/v2/all?fields=name;currencies',
  currencyAPI: 'https://v3.exchangerate-api.com/pair/61e57eba8437f0db8fa02b1c',
};
