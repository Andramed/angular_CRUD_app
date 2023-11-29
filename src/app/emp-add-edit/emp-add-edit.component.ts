import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { AppService } from '../app.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditEmp } from '../interface/EditEmpData';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {

	empForm!: FormGroup;

	constructor(
			private _formBuilder: FormBuilder,
			private _empService: EmployeeService,
			private _dialogRef: DialogRef<EmpAddEditComponent>, 
			private _appService: AppService,
			@Inject(MAT_DIALOG_DATA) public data: EditEmp

		){
		this.empForm = this._formBuilder.group({
			firstName: '',
			lastName: '',
			email: '',
			
		})
	}
	ngOnInit(): void {
		this.empForm.patchValue(this.data);
	}

	switcherSaveOrUpdate() {
		this.data ?  this.editUser(this.data) : this.saveNewEmp();
		;
		
	}

	saveNewEmp() {
		if (this.empForm.valid) {
			console.log('forma valid');
			
			this._empService.addEmploye(this.empForm.value).subscribe({
				next: (res) =>{
					console.log('vine raspuns');
					
					console.log(
						{
							body: res.body,
							status: res.status,
							statusText: res.statusText,
							allResponse: res 
						}
					);
					this._appService.getListEmp();
					this._dialogRef.close();
					
				},
				error: (err: any) => {
					console.log('eroare');
					console.log(err);
					
				}
			})
		}
	}

	editUser(data: EditEmp) {
		console.log(data);
		console.log('will edit and update user:', data.id);
		this._empService.editEmployee(data.id, this.empForm.value).subscribe({
			next: (res) => {
				console.log('send edit request');
				console.log({
					body: res.body,
					status: res.status,
					statusText: res.statusText,
					allResponse: res 
				});
				this._appService.getListEmp();
				this._dialogRef.close();
			}, 
			error: (err) => {
				console.log({error:err});
			}
		});
	}
}
