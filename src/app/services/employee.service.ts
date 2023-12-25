import { Injectable } from '@angular/core'; // version cu intreceptor
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http"
import { Employe } from '../interface/Employee';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { ServerResponse } from '../interface/ServerResponse';
import { EditEmp } from '../interface/EditEmpData';
import { environment } from 'src/environments/environment.prod';
import { modelJWT } from '../interface/JWT';
import { Select, Selector } from '@ngxs/store';
import { JWTSelector } from './storeNgxs/selectors/jwt.selector';
import { URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
	
	
	
  constructor(private _http: HttpClient) { }

  @Select(JWTSelector.jwt) jwtNgxs$!: Observable<modelJWT>

	addEmploye(data: Employe) :Observable<HttpResponse<ServerResponse>> {
		return  this._http.post<HttpResponse<ServerResponse>>(`${URL}employee/create`, data, {
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
		return this._http.get<Employe[]>(`${URL}employee/allemp`, 
			{
				observe:'response',
			})
			.pipe(
				catchError(error => {
				throw({
					error,
				})
				})
			);
	}
  
	deleteEmploye(id: number): Observable<HttpResponse<Employe>>{
		const response = this._http.delete<Employe>(`${URL}employee/${id}/delete`, {
			observe: 'response'
		})
		.pipe(
			catchError(error => {
				throw ({
					error,
				})
			})
		)
		return response
	}

	editEmployee(id: number, data: EditEmp) : Observable<HttpResponse<Employe>> {
		const response = this._http.patch<Employe>(`${URL}employee/${id}/edit`, data,  {
			observe: 'response'
		})
		.pipe(
				catchError(error => {
					throw ({
						error,
					})
				})
			)
		return response
	}

}