import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoarageService {

  constructor() { }

  set(key: string, value: string) {
	localStorage.setItem(key, value);
  }

  get(key:string): string| null{
	 const jwt = localStorage.getItem(key);
	 if (jwt) {
		const token = JSON.parse(jwt);
		return token.tokenAcces;
		
	 }
	 return null
  } 

  remov(key:string) {
	localStorage.removeItem(key)
  }
}
