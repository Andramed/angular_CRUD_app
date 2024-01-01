import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InputValidatorService {

  constructor() { }

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

}
