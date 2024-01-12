import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { URL } from '../constants';
import { Manager } from '../interface/Manager';

@Injectable({
  providedIn: 'root'
})



export class ManagerService {

  constructor(
		private _http: HttpClient
  ) { }

  getManager(): Observable<HttpResponse<Manager[]>> {
		const response = this._http.get<Manager[]>(`${URL}manager`, {
			observe: "response"
		}).pipe(
			catchError(err => {
				throw ({
					err
				})
			})
		)


		return response
  }

}
