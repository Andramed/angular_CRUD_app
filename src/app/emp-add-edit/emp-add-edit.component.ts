import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent {

	empForm!: FormGroup;

	constructor(
			private _formBuilder: FormBuilder,
			private _empService: EmployeeService,
			private _dialogRef: DialogRef<EmpAddEditComponent> 
		){
		this.empForm = this._formBuilder.group({
			firstName: '',
			lastName: '',
			email: '',
			
		})
	}

	onSubmit() {
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
					this._dialogRef.close();
				},
				error: (err: any) => {
					console.log('eroare');
					console.log(err);
					
				}
			})
		}
	}

	

}
