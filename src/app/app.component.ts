import { Component, OnInit,  ViewChild} from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './component/emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Employe } from './interface/Employee';
import { AppService } from './services/App.service';
import { Observable} from 'rxjs';
import { EditEmp } from './interface/EditEmpData';
import { AuthState } from './interface/AuthState';
import { Select, Store } from '@ngxs/store';
import { UserSelector } from './services/storeNgxs/selectors/authenticatedUser.selector';
import { GuardService } from './services/guard.service';
import { FormAuthComponent } from './auth/form-auth/form-auth.component';
import { JWTServiceService } from './services/jwtservice.service';
import { LocalStoarageService } from './services/local-stoarage.service';
import { DecodedTokenInerface } from './interface/DecodedToken';
import { DialogWindowAddManagerComponent } from '../app/component/dialog-window-add-manager/dialog-window-add-manager.component';
import {UserService} from '../../src/app/services/user.service';
import { EmpModel, EmpState } from './services/storeNgxs/states/empState.state';
import { RemoveEmp } from './services/storeNgxs/actions/saveEmp.actions';
import { EmpListSelector } from './services/storeNgxs/selectors/empList.selector';
import { Router } from '@angular/router';
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
	// list$!:Observable<EmpModel>
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
		private userService: UserService,
		private route: Router
	
	){
		this.logedUser$ = store.select('auth');
	};

	@Select(UserSelector.userLoged) userLogedNgxs$!: Observable<DecodedTokenInerface>
	@Select(EmpListSelector.list) list$!: Observable<Employe[]> 

	ngOnInit(){
	
		
		const tokenPresent = this.checkIfTokenExist();
		let isExpired:boolean = true
		console.log(this.isAuthorized);
		
		if (tokenPresent) {
			isExpired = this.checkIfTokenIsExpired();
			if (!isExpired) {
				this.userService.authorize("tokenPresent")
				this.route.navigate(['/home'])
			} else {
				// this._dialog.open(FormAuthComponent)			
				this.route.navigate(['/signin'])
			}
		} else {
			// this._dialog.open(FormAuthComponent)
			this.route.navigate(['/signin'])

		}
		
		this.userLogedNgxs$.subscribe({
			next: (user) => {
				// this.userRole = user.role;
				// this.user = user.email;
				// this.managerId = user.sub,
				this.isAuthorized= user.isAuthorized
			} 
		})	
		
		
	
	}
	


	checkIfTokenExist(): boolean {
		const token = this.localStorage.get("myToken")
		return token ? true : false
	}

	checkIfTokenIsExpired(): boolean {
		let isExpired: boolean = false
			this.guard.guard().subscribe({
				next: (value) => {
					isExpired = value
				}
			})
		return isExpired
	}
	
		
}
