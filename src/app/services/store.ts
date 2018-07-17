import { Countries } from '../Data/data'

export class CalcStore {
  
	countryList: any;

	constructor() {
		let persistedTodos = JSON.parse(localStorage.getItem('angular2-todos') || '[]');		
		this.countryList = Countries;
	}

	
}
