import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { map } from 'rxjs/operators';

import { jwtDecode } from "jwt-decode"
import { JWTSelector } from './storeNgxs/selectors/jwt.selector';
import { Observable } from 'rxjs';
import { LocalStoarageService } from './local-stoarage.service';
import { DecodedTokenInerface } from '../interface/DecodedToken';
import { SaveDecodedJWT } from './storeNgxs/actions/saveDecodedToken.actions';
import { saveJWT } from './storeNgxs/actions/saveToken.action';

@Injectable({
  providedIn: 'root'
})
export class JWTServiceService {
	decodedToken!: DecodedTokenInerface
	token!:string
	isAuthorized!: boolean
	constructor(
		private store: Store,
		private localStorageService: LocalStoarageService
	){}
	
	@Select(JWTSelector.jwt) tokenAcces$!: Observable<string>

	decodeToken(isAuthorized: boolean, initialize:string): Observable<DecodedTokenInerface | null> {
		this.isAuthorized = isAuthorized
		return this.tokenAcces$.pipe(
		  map(token => {
			const localStorageToken = this.localStorageService.get('accesToken');
			if (localStorageToken) {
			  token = localStorageToken;
			}
			if (token && typeof token === 'string') {
			  this.token = token;
			  try {
				this.decodedToken = jwtDecode(token);
				console.log({
					location: "decodeToken info about decoded",
					decodedToken: this.decodedToken
				});
				
				if (isAuthorized) {
					this.store.dispatch(new SaveDecodedJWT(this.decodedToken, isAuthorized))
				}
				return this.decodedToken;
			  } catch (error) {
				console.error(error);
				return null;
			  }
			} else {
			  console.error('Token is missing or not a string');
			  return null;
			}
		  })
		);
	  }
	  
	  

	  getExpireTime(): Observable<number | undefined> {
		
		return this.decodeToken(this.isAuthorized, 'getExpireTime').pipe(
		  map(decodedToken => decodedToken?.exp)
		);
	  }

	  getRole(): Observable<string | undefined> {
		return this.decodeToken(this.isAuthorized, "GetRole").pipe(
			map(decodedToken => decodedToken?.role)
		)
	  }
	  getUser(): Observable<string | undefined> {
		return this.decodeToken(this.isAuthorized, "getUser").pipe(
			map(decodedToken => decodedToken?.email)
		)
	  }
	  

	  isTokenExpired(): Observable<boolean> {
		return this.getExpireTime().pipe(
		  map(expireTime => {
			const currentTime = Math.floor(Date.now() / 1000);
			if (expireTime && typeof expireTime === 'number') {
				console.log(currentTime >= expireTime, "Toke expirat");
				
			  return currentTime >= expireTime;
			} else {
				console.log("Token ne expirat coninuam navigarea");
				
			  return true;
			}
		  })
		);
	  }

	  
	
}
