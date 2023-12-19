import { Injectable } from '@angular/core';
import { SignIn } from '../interface/SignData';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(
		private http: HttpClient,

  ) { }
URL:string = "http://172.20.0.4:3000"

  signIn(data: SignIn): Observable<HttpResponse<any>> {
	console.log(data);
	const response = this.http.post(`${this.URL}signin`, 
		{
			data: data
		},
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
