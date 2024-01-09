import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AddManagerService} from '../../services/add-manager.service';


import { DialogRef } from '@angular/cdk/dialog';

import {InputValidatorService} from '../../services/input-validator.service'
@Component({
  selector: 'app-dialog-window-add-manager',
  templateUrl: './dialog-window-add-manager.component.html',
  styleUrls: ['./dialog-window-add-manager.component.css']
})
export class DialogWindowAddManagerComponent{
	



	
	
	requirmentsFor!: [string, string]
	managerForm!: FormGroup;
	requirmentsActive!: boolean

	constructor (
		private _formBuilder: FormBuilder,
		private addManager: AddManagerService,
		private dialogRef: DialogRef<DialogWindowAddManagerComponent>,
		private validator: InputValidatorService
	) {



		this.managerForm = this._formBuilder.group({
			firstName: ['', [Validators.required, this.validator.firstNameValidator()]],
			lastName: ['', [Validators.required, this.validator.firstNameValidator()]],
			email: ['', [Validators.required, Validators.email]], 
			password: ['', [Validators.required, this.validator.passwordValidator()]] //(control: AbstractControl) => this.passwordValidator(control)
		});

	
	}

	onSubmit() {
		console.log('create new manager');
		const {email, password, firstName, lastName} = this.managerForm.value;
			console.log(this.managerForm.value);
			
			this.addManager.signUp({email, password, firstName, lastName})
				.subscribe({
					next: (res) => {
						if (res) {
							
							if (res.status) {
								this.dialogRef.close()
							}
						}
					},
					error(err) {
						throw ({
							err
						})
					},
				})
	}

	

	

	  

	  

	  setRequirment(value: [string, string]) {
		this.requirmentsFor = [...value]
	  }

	  insetRequrments() {
		this.requirmentsFor = ['', '']
	  }


}
