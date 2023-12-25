import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignIn } from '../interface/SignData';
import { Observable, catchError } from 'rxjs';
import {ManagerModel} from '../interface/ManagerModel'
import { environment } from 'src/environments/environment.prod';
import { URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AddManagerService {

  constructor(
	private http: HttpClient
  ) { }



  signUp(data: ManagerModel) : Observable<HttpResponse<any>> {
		const response = this.http.post(`${URL}addmanager`,
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
