import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { JWTServiceService } from './jwtservice.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  isExpired!:boolean
  constructor(
		private jwtService: JWTServiceService
  ) { }

 
  
   guard() : Observable<boolean>  {
		
		
		return this.jwtService.isTokenExpired()
			.pipe(
				
				map( isExpired => {
					return isExpired
				})
			)
  }
} 
