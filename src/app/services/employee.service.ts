import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpResponse} from "@angular/common/http"
import { Employe } from '../interface/Employee';
import { Observable, catchError, of } from 'rxjs';
import { ServerResponse } from '../interface/ServerResponse';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  URL: string = 'http://localhost:3000/';

  constructor(private _http: HttpClient) { }

 addEmploye(data: Employe) :Observable<HttpResponse<ServerResponse>> {
		console.log('ce se intimpla in add Employee');
		
		return  this._http.post<HttpResponse<ServerResponse>>('http://localhost:3000/employee', data, {
			observe: 'response'
		}).pipe(
			catchError(error => {
				throw ({
					error,
				})
				
			})
		);	
  } 

  getEmployee(): Observable<HttpResponse<Employe[]>> {
	const response = this._http.get<Employe[]>('http://localhost:3000/employee', 
	{observe:'response'})
	.pipe(
		catchError(error => {
			throw({
				error,
			})
		})
	)
	;
	return response
  }
}
