import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditEmp } from 'src/app/interface/EditEmpData';
import { Employe } from 'src/app/interface/Employee';
import { AppService } from 'src/app/services/App.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { Select } from '@ngxs/store';
import { EmpListSelector } from 'src/app/services/storeNgxs/selectors/empList.selector';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit  {

	constructor(
		private empService: EmployeeService,
		private appService: AppService,
		private _dialog: MatDialog,

	) {

	}

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'action'];
	dataSource!: MatTableDataSource<Employe>;
	isAuthorized!: boolean | undefined

	@Select(EmpListSelector.list) list$!: Observable<Employe[]>
	ngOnInit(): void {
		this.list$.subscribe({
			next: (data) => {

				console.log({
					locat: "init emp component",
					data
				});
								
				this.getDataOfEmp(data)
			}
		})
		
	}
	getDataOfEmp(data: Employe[]){
		this.dataSource = new MatTableDataSource<Employe>(data);
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
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
					this.appService.getListEmp();
				},
				error: (err) => {
					console.log(err);	
				}, 
			});
	} 

	openEditEmpForm(data: EditEmp){
		this._dialog.open(EmpAddEditComponent, {
			data,
		});
	}
	openAddEmpDialogForm() {
		this._dialog.open(EmpAddEditComponent)
	}
}
