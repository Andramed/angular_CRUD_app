import { Injectable } from '@angular/core';
import { EmployeeService } from './services/employee.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private empService: EmployeeService) { }

  sharedMethod() {
    
  }
}