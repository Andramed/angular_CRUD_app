import { Injectable } from '@angular/core';
import { SignIn } from '../interface/SignData';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { URL} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(
		private http: HttpClient,
		

  ) { }

		signIn(data: SignIn): Observable<HttpResponse<any>> {
			console.log(data);
			const response = this.http.post(`${URL}signin`, 
				{username:data.email, password:data.password, data},
				{
					observe: 'response'
				} 
			)
			.pipe(
				catchError(error => {
					throw ({
						error
					});
					
				})
			)
			return response
		}

}
