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
import { firstValueFrom } from 'rxjs';
import { EditEmp } from './interface/EditEmpData';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	
	constructor(
		private _dialog: MatDialog,
		private empService: EmployeeService,
		private appService: AppService,
	){};

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'action'];
	dataSource!: MatTableDataSource<Employe>;
	
	ngOnInit(){
		console.log('se initializeaza');
		this.appService.getListEmp();
		this.appService.dataSubject.subscribe( data => {
			this.dataSource = new MatTableDataSource<Employe>(data);
			this.dataSource.sort = this.sort;
			this.dataSource.paginator = this.paginator;
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
		console.log(`delete user with id: ${id}`);
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
}
