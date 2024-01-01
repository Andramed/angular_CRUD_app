import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AddManagerService} from '../services/add-manager.service';
import { DialogRef } from '@angular/cdk/dialog';

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
		private dialogRef: DialogRef<DialogWindowAddManagerComponent>
	) {



		this.managerForm = this._formBuilder.group({
			firstName: ['', [Validators.required, this.firstNameValidator()]],
			lastName: ['', [Validators.required, this.firstNameValidator()]],
			email: ['', [Validators.required, Validators.email]], 
			password: ['', [Validators.required, this.passwordValidator()]] //(control: AbstractControl) => this.passwordValidator(control)
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

	

	passwordValidator(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
		  const value = control.value;
		  let errors: ValidationErrors = {};
	  
		  if (value.length <= 8) {
			errors['passwordLength'] = 'Password too short';
		  }
	  
		  if (!/\d/.test(value)) {
			errors['containNumber'] = 'Number required';
		  }
	  
		  if (!/[A-Z]/.test(value)) {
			errors['capitalLetter'] = 'One capital character required';
		  }
	  
		  if (!/[!@#$%^&*]/.test(value)) {
			errors['specialCharacter'] = 'Special character required';
		  }
	  
		  return Object.keys(errors).length > 0 ? errors : null;
		};
	  }

	  firstNameValidator(): ValidatorFn {
			return (control: AbstractControl) : ValidationErrors | null => {
				const {value} = control;
				let errors: ValidationErrors = {};
				if ( !/[A-Z]/.test(value[0] )) {
					errors['capitalLetter'] = 'First letter capital character required';
				}
				return  Object.keys(errors).length > 0 ? errors : null
			}
	  }

	  

	  setRequirment(value: [string, string]) {
		this.requirmentsFor = [...value]
	  }

	  insetRequrments() {
		this.requirmentsFor = ['', '']
	  }


}
