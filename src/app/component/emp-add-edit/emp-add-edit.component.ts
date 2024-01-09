import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { AppService } from '../../services/App.service'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditEmp } from '../../interface/EditEmpData';
import { InputValidatorService } from '../../services/input-validator.service';


@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {

	empForm!: FormGroup;
	managerId!: number | undefined;
	managerEmail: string | undefined;
	userRole: string | undefined
	requirmentsFor!: [string, string]
	constructor(
			private _formBuilder: FormBuilder,
			private _empService: EmployeeService,
			private _dialogRef: DialogRef<EmpAddEditComponent>, 
			private _appService: AppService,
			@Inject(MAT_DIALOG_DATA) public data: EditEmp,
			private validator: InputValidatorService


		){
		this.empForm = this._formBuilder.group({
			firstName: ['', [Validators.required, this.validator.firstNameValidator()]],
			lastName: ['', [Validators.required, this.validator.firstNameValidator()]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, this.validator.passwordValidator()]],
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
			const {firstName, lastName, email, password} = this.empForm.value
			this._empService.addEmploye(
				{
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: password
				}
				).subscribe({
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
	setRequirment(value: [string, string]) {
		this.requirmentsFor = [...value]
	  }

	  insetRequrments() {
		this.requirmentsFor = ['', '']
	  }
}
