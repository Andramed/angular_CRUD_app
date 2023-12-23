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
import { DialogWindowAddManagerComponent } from './dialog-window-add-manager/dialog-window-add-manager.component';

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
				console.log(
					{
						message: "token not expired",
						statusExpired: value
					}
				);
				
				if (!value) {
					console.log('toke not expired');
					// need to validate toke in the back-end side obtaine if is valide or not
					this.guard.validateToken().subscribe({
						
						next: (value) => {
							if (value.ok) {
								this.isAuthorized = true
								console.log(this.isAuthorized, "cind am obtinut pe back ca token valid");
								const decodeToken = this.jwtService.decodeToken(this.isAuthorized, "ng on init app components").subscribe()
								
								
								
							}
							
							this.appService.dataSubject.subscribe( data => {
								this.dataSource = new MatTableDataSource<Employe>(data);
								this.dataSource.sort = this.sort;
								this.dataSource.paginator = this.paginator;
							})
							this.appService.getListEmp();
						},
						error: (err) => {
							console.log({
								message: "Token is not valide rederiction user to signIN",
	
							});

							if (err.status === 401) {
								console.log('token expired try to sign in');
								this._dialog.open(FormAuthComponent);
							}		
						}
					})
				} else {
					console.log('token expired try to sign in');
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
					this.appService.getListEmp();
				},
				error: (err) => {
					console.log(err);	
				}, 
			});
	} 

	openAddManager() {
		console.log('open new window add new manager');
		this._dialog.open(DialogWindowAddManagerComponent)
	}

	

	logout(){
		console.log('logout');
		this.localStorage.remov('myToken')
		this.isAuthorized  = false
		this.user = undefined
		this.userRole = undefined
		this._dialog.open(FormAuthComponent)
	}
}
