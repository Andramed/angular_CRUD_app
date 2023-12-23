import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http"
import { Employe } from '../interface/Employee';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { ServerResponse } from '../interface/ServerResponse';
import { EditEmp } from '../interface/EditEmpData';
import { environment } from 'src/environments/environment.prod';
import { modelJWT } from '../interface/JWT';
import { Select, Selector } from '@ngxs/store';
import { JWTSelector } from './storeNgxs/selectors/jwt.selector';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
	URL:string = "http://3.79.245.193:3000/"
	// URL:string = "http://localhost:3000/"
	
  constructor(private _http: HttpClient) { }

  @Select(JWTSelector.jwt) jwtNgxs$!: Observable<modelJWT>

  

 addEmploye(data: Employe) :Observable<HttpResponse<ServerResponse>> {
		
	return this.jwtNgxs$.pipe(
		switchMap((jwt:modelJWT) => {
			return  this._http.post<HttpResponse<ServerResponse>>(`${this.URL}employee/create`, data, {
				headers: new HttpHeaders().set('Authorization', `Bearer ${jwt}`),
				observe: 'response'
			}).pipe(
				catchError(error => {
					throw ({
						error,
					})
					
				})
			);
		})
	)
		
		
  } 

  getEmployee(): Observable<HttpResponse<Employe[]>> {
	
	const emp = this.jwtNgxs$.pipe(
		switchMap((jwt:modelJWT) => {
			return this._http.get<Employe[]>(`${this.URL}employee/allemp`, 
				{
					headers: new HttpHeaders().set('Authorization', `Bearer ${jwt}`),
					observe:'response',
				})
				.pipe(
					catchError(error => {
					throw({
						error,
					})
					})
				);
		})
	)

	return emp
  }
  
  

	deleteEmploye(id: number): Observable<HttpResponse<Employe>>{
			return this.jwtNgxs$.pipe(
				switchMap((jwt: modelJWT) => {
					const response = this._http.delete<Employe>(`${this.URL}employee/${id}/delete`, {
						headers: new HttpHeaders().set('Authorization', `Bearer ${jwt}`),
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
				})
			)
	}

	editEmployee(id: number, data: EditEmp) : Observable<HttpResponse<Employe>> {
		console.log({
			data,
			id
		});
		
		return  this.jwtNgxs$.pipe(
			switchMap((jwt: modelJWT) => {
				const response = this._http.patch<Employe>(`${this.URL}employee/${id}/edit`, data,  {
					headers: new HttpHeaders().set('Authorization', `Bearer ${jwt}`),
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
			})
		)
		
	}

}