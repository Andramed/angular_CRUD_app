import { Component, OnInit,  ViewChild} from '@angular/core';
import { AppModule } from './app.module';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Employe } from './interface/Employee';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email'];
	dataSource!: MatTableDataSource<Employe>;
  
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(
	private _dialog: MatDialog,
	private empService: EmployeeService
) {}
	ngOnInit(): void {
		this.getAllRegistredEmp()
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	
		if (this.dataSource.paginator) {
		  this.dataSource.paginator.firstPage();
		}
	  }

	openAddEditEmpForm() {
		this._dialog.open(EmpAddEditComponent);
	}
	getAllRegistredEmp() {
		this.empService.getEmployee().subscribe(
			{
				next: (res) => {
					const source= res.body
					console.log(this.dataSource);
					console.log(source);
					
					if (source) {
						this.dataSource = new MatTableDataSource<Employe>(source);
						this.dataSource.sort = this.sort;
						this.dataSource.paginator = this.paginator;
						console.log(this.dataSource);
					}
				},
				error: (err) => {
					console.log(err);
					
				}
			}
		)
	}

  
}
