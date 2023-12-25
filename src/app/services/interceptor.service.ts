import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInService } from './sign-in.service';
import { Observable, switchMap } from 'rxjs';
import { User } from '../interface/User';
import { Select, Store } from '@ngxs/store';
import { JWTSelector } from './storeNgxs/selectors/jwt.selector';
import { modelJWT } from '../interface/JWT';
import { LocalStoarageService } from './local-stoarage.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
	
  constructor(
	private localStorage: LocalStoarageService
  ) { }
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
				const token = this.localStorage.get("myToken");
				if (token) {
					const authRequest = req.clone({
						headers: req.headers.set('Authorization', `Bearer ${token}`)
					  });
					  return next.handle(authRequest);
				}	
				return next.handle(req);
	}
}	
