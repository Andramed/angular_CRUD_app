import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignIn } from '../interface/SignData';
import { Observable, catchError, tap } from 'rxjs';
import {ManagerModel} from '../interface/ManagerModel'
import { environment } from 'src/environments/environment.prod';
import { URL } from '../constants';
import { Store } from '@ngxs/store';

import { SaveManagers } from './storeNgxs/actions/saveManagers.action';

@Injectable({
  providedIn: 'root'
})
export class AddManagerService {

  constructor(
	private http: HttpClient,
	private store: Store
  ) { }



	signUp(data: ManagerModel) : Observable<HttpResponse<any>> {
			const response = this.http.post(`${URL}manager`,
				{
					...data,
					role: 2
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
