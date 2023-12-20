import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignIn } from '../interface/SignData';
import { Observable, catchError } from 'rxjs';
import {ManagerModel} from '../interface/ManagerModel'
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AddManagerService {

  constructor(
	private http: HttpClient
  ) { }

  URL:string = "http://172.26.0.5:3000/" 

  signUp(data: ManagerModel) : Observable<HttpResponse<any>> {
		console.log(data);
		
		const response = this.http.post(`${this.URL}addmanager`,
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
