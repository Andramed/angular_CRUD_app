import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoarageService {

  constructor() { }

  set(key: string, value: string) {
	localStorage.setItem(key, value);
  }

  get(key:string): string | null {
	 return localStorage.getItem(key)
  } 

  remov(key:string) {
	localStorage.removeItem(key)
  }
}
