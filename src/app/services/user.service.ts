import { Injectable, ViewChild } from '@angular/core';
import {GuardService} from './guard.service'
import { JWTServiceService } from './jwtservice.service';
import { Observable } from 'rxjs';
import { AppService } from './App.service';
import { MatTableDataSource } from '@angular/material/table';
import { Employe } from '../interface/Employee';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	isAuthorized!: boolean;
	dataSource!: MatTableDataSource<Employe>;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
	private guardService: GuardService,
	private jwtService: JWTServiceService,
	private appService: AppService,
	private store: Store
  ) { 
  }

  authorize(useCase:string) {
	switch (useCase) {
		case "tokenPresent":
			this.guardService.validateToken().subscribe({
				next: (value) => {
					if (value) {
						this.isAuthorized = true;
						this.jwtService.decodeToken(this.isAuthorized, "ng on init app components").subscribe();
						this.appService.getListEmp();
					
						
						// this.getDataOfEmp();
					}
				},
			});
			break;

		case "signIn":
				this.isAuthorized = true;
				this.jwtService.decodeToken(this.isAuthorized, "ng on init app components").subscribe();
				this.appService.getListEmp();
				// this.getDataOfEmp();
			break;
			
			
		default:
			break;
	}		
  }

  getDataOfEmp () {
	this.appService.dataSubject.subscribe(
		data =>  {
			this.dataSource = new MatTableDataSource<Employe>(data);
			this.dataSource.sort = this.sort;
			this.dataSource.paginator = this.paginator
		}
	) 
  }
  
}
