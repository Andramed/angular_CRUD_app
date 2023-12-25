import { Component, OnInit,  ViewChild} from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Employe } from './interface/Employee';
import { AppService } from './App.service';
import { Observable, firstValueFrom, map, take, tap } from 'rxjs';
import { EditEmp } from './interface/EditEmpData';
import { AuthState } from './interface/AuthState';
import { Select, Store } from '@ngxs/store';
import { UserSelector } from './services/storeNgxs/selectors/authenticatedUser.selector';
import { GuardService } from './services/guard.service';
import { FormAuthComponent } from './auth/form-auth/form-auth.component';
import { JWTServiceService } from './services/jwtservice.service';
import { LocalStoarageService } from './services/local-stoarage.service';
import { DecodedTokenInerface } from './interface/DecodedToken';
import { DialogWindowAddManagerComponent } from './dialog-window-add-manager/dialog-window-add-manager.component';
import {UserService} from '../../src/app/services/user.service'
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
	isAuthorized!: boolean | undefined
	userRole!: string | undefined
	managerId!: number | undefined
	tokenIsExpired!:boolean

	constructor(
		private _dialog: MatDialog,
		private empService: EmployeeService,
		private appService: AppService,
		private store: Store,
		private guard: GuardService,
		private jwtService: JWTServiceService,
		private localStorage: LocalStoarageService,
		private userService: UserService
	
	){
		this.logedUser$ = store.select('auth')
	};

	@Select(UserSelector.userLoged) userLogedNgxs$!: Observable<DecodedTokenInerface>

	ngOnInit(){
		const tokenPresent = this.checkIfTokenExist();
		let isExpired:boolean = true
		let isTokenVlaid:boolean = false
		if (tokenPresent) {
			isExpired = this.checkIfTokenIsExpired()
		} else {
			this._dialog.open(FormAuthComponent)
		}
		if (!isExpired) {
			this.userService.authorize("tokenPresent")
			this.getDataOfEmp()
		}
		this.userLogedNgxs$.subscribe({
			next: (user) => {
				this.userRole = user.role;
				this.user = user.email;
				this.managerId = user.sub,
				this.isAuthorized= user.isAuthorized
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

	checkIfTokenExist(): boolean {
		const token = this.localStorage.get("myToken")
		return token ? true : false
	}
	checkIfTokenIsExpired(): boolean {
		let isExpired: boolean = true
			this.guard.guard().subscribe({
				next: (value) => {
					isExpired = value
				}
			})
		return isExpired
	}
	
	getDataOfEmp(){
		this.appService.dataSubject.subscribe( data => {
			this.dataSource = new MatTableDataSource<Employe>(data);
			this.dataSource.sort = this.sort;
			this.dataSource.paginator = this.paginator;
		})
		
	}
	
}
