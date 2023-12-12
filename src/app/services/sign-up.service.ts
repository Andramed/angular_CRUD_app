import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignIn } from '../interface/SignData';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
	private http: HttpClient
  ) { }

  URL:string = 'http://localhost:3000/'

  signUp(data: SignIn) : Observable<HttpResponse<any>> {
		const response = this.http.post(`${this.URL}signup`,
			{
				data
			},
			{
				observe: 'response'
			}
		)
		.pipe(
			catchError(error => {
				throw ({
					error
				})
			})
		)
		return response
  }

}
