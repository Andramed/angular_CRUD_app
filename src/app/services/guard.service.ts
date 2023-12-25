import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { JWTServiceService } from './jwtservice.service';
import { Observable, catchError, map, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { LocalStoarageService } from './local-stoarage.service';
import { JWTSelector } from './storeNgxs/selectors/jwt.selector';
import { modelJWT } from '../interface/JWT';
import { Select } from '@ngxs/store';
import { URL } from '../constants';
@Injectable({
  providedIn: 'root'
})


export class GuardService {
	isExpired!:boolean
 
	constructor(
			private jwtService: JWTServiceService,
			private http: HttpClient,
			private storageService: LocalStoarageService
	) { }


	guard() : Observable<boolean>  {
			return this.jwtService.isTokenExpired()
				.pipe(
					
					map( isExpired => {
						
						return isExpired
					})
				)
	}
	validateToken(): Observable<boolean>  {
		return new Observable<boolean>(observer => {
			this.http.get<any>(`${URL}signin/validate`, {
						observe: 'response'
					})
					.subscribe({
						next: (response) => {
							observer.next(true);
							observer.complete();
						},
						error: (err) => {
							console.error(err);
							observer.next(false);
							observer.complete();
						}
					});
		});
	}
} 
