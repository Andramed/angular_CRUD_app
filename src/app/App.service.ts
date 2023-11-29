import { Injectable, ViewChild } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { Employe } from './interface/Employee';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private empSerive: EmployeeService) { }

 
  dataSubject: BehaviorSubject<Employe[]> = new BehaviorSubject<Employe[]>([]);

  

	getListEmp() {		
		this.empSerive.getEmployee().subscribe(
			res => {
				const source = res.body;
				if (source) {
					this.dataSubject.next(source)
				}
			}
		)			
	}
	
}
