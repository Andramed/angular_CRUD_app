import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { JWTServiceService } from './jwtservice.service';
import { Observable, catchError, map, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { LocalStoarageService } from './local-stoarage.service';
import { JWTSelector } from './storeNgxs/selectors/jwt.selector';
import { modelJWT } from '../interface/JWT';
import { Select } from '@ngxs/store';

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

  URL:string = "http://3.79.245.193:3000/"
// URL:string = "http://localhost:3000/"
   guard() : Observable<boolean>  {
		return this.jwtService.isTokenExpired()
			.pipe(
				
				map( isExpired => {
					console.log(isExpired);
					return isExpired
				})
			)
  }
  @Select(JWTSelector.jwt) jwtNgxs$!: Observable<modelJWT>

	validateToken() : Observable<HttpResponse<any>> {
		return this.jwtNgxs$.pipe(
			switchMap((jwt: modelJWT) => {
				console.log(jwt); // Acesta va afișa obiectul jwt în consolă
				return this.http.get<any>(`${this.URL}signin/validate`, {
					headers: new HttpHeaders().set('Authorization', `Bearer ${jwt}`),
					observe: 'response'
				})
				.pipe(
					catchError(err => {
						throw err
					}) 
				)
			})
		);
	}





} 
