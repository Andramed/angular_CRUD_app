import { Component, OnInit,  ViewChild} from '@angular/core';
import { AppModule } from './app.module';
import {  MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Employe } from './interface/Employee';
import { AppService } from './App.service';
import { Observable, firstValueFrom, map, tap } from 'rxjs';
import { EditEmp } from './interface/EditEmpData';
import { AuthState } from './interface/AuthState';
import { User } from './interface/User';
import { Select, Store } from '@ngxs/store';
import { UserSelector } from './services/storeNgxs/selectors/authenticatedUser.selector';
import { GuardService } from './services/guard.service';
import { FormAuthComponent } from './auth/form-auth/form-auth.component';
import { JWTServiceService } from './services/jwtservice.service';
import { LocalStoarageService } from './services/local-stoarage.service';
import { SaveDecodedJWT } from './services/storeNgxs/actions/saveDecodedToken.actions';
import { JWTSelector } from './services/storeNgxs/selectors/jwt.selector';
import { DecodedTokenInerface } from './interface/DecodedToken';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'action'];
	dataSource!: MatTableDataSource<Employe>;
	logedUser$!: Observable<AuthState>
	user!: string | undefined
	isAuthorized!: boolean
	userRole!: string | undefined
	managerId!: number | undefined

	constructor(
		private _dialog: MatDialog,
		private empService: EmployeeService,
		private appService: AppService,
		private store: Store,
		private guard: GuardService,
		private jwtService: JWTServiceService,
		private localStorage: LocalStoarageService
	
	){
		this.logedUser$ = store.select('auth')
	};

	@Select(UserSelector.userLoged) userLogedNgxs$!: Observable<DecodedTokenInerface>
	
	
	ngOnInit(){	
		
		this.guard.guard().subscribe({
			next: (value) => {
				this.isAuthorized = value
				if (!value) {
					console.log(value);
					this.appService.dataSubject.subscribe( data => {
					this.dataSource = new MatTableDataSource<Employe>(data);
					this.dataSource.sort = this.sort;
					this.dataSource.paginator = this.paginator;
		})
				} else {
					this._dialog.open(FormAuthComponent);
				}
				
			}
		})
		this.userLogedNgxs$.subscribe({
			next: (user) => {
				console.log('user: ', user);
				this.userRole = user.role;
				this.user = user.email;
				this.managerId = user.sub
				this.appService.getListEmp(user.sub);
			}
		})

	}

	openAddEditEmpForm() {
		this._dialog.open(EmpAddEditComponent);
	}

	openEditEmpForm(data: EditEmp){
		this._dialog.open(EmpAddEditComponent, {
			data,

		});
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
		  this.dataSource.paginator.firstPage();
		}
	}

	deleteUser(id: number) {
		this.empService.deleteEmploye(id)
			.subscribe({
				next: (res) => {
					console.log(res);
					this.appService.getListEmp(this.managerId);
				},
				error: (err) => {
					console.log(err);	
				}, 
			});
	} 

	logout(){
		console.log('logout');
		this.localStorage.remov('accesToken')
		this.isAuthorized  = true
		this.user = undefined
		this._dialog.open(FormAuthComponent)
	}
}
