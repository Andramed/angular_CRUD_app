import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { URL } from '../constants';
import { Manager } from '../interface/Manager';
import { Store } from '@ngxs/store';
import { SaveManagers } from './storeNgxs/actions/saveManagers.action';
import { ManagerModel } from '../interface/ManagerModel';
import { EditManagerModel } from '../interface/EditManagerModel';
import { ServerResponse } from '../interface/ServerResponse';

@Injectable({
  providedIn: 'root'
})



export class ManagerService {

  constructor(
		private _http: HttpClient,
		private store: Store
  ) { }

  dataSubject: BehaviorSubject<Manager[]> = new BehaviorSubject<Manager[] >([])

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

	editManager(id: number, data: EditManagerModel): Observable<HttpResponse<any>> {
		return this._http.patch<any>(`${URL}manager/${id}/edit`, data, {
			observe: 'response'
		})
		.pipe(
				catchError(err => {
					throw ({
						err
					})
				})
		)
	}

	deleteManager(id: number) : Observable<HttpResponse<ServerResponse>> {
		return this._http.delete<ServerResponse>(`${URL}manager/${id}/delete`, {
			observe: 'response'
		})
		.pipe(
			catchError(
				err => {
					throw ({
						err
					});
					
				}
			)
		)
	}

	getDataChanged() {
		this.getManager().subscribe(
			res => {
				const data = res.body
				if (data) {
					this.dataSubject.next(data)
					this.store.dispatch(new SaveManagers(data))
				}
			}
		)
	}

}
