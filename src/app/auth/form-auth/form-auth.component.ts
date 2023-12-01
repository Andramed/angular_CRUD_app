import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { SignInService } from 'src/app/services/sign-in.service';


@Component({
  selector: 'app-form-auth',
  templateUrl: './form-auth.component.html',
  styleUrls: ['./form-auth.component.css']
})
export class FormAuthComponent {
	signInForm!: FormGroup;

	constructor(
		private _formBuilder: FormBuilder,
		private _signInService: SignInService,

	) {
		this.signInForm = this._formBuilder.group({
			email: '',
			password: '',
		})
	}

	signIn() {
		this._signInService.signIn(this.signInForm.value).subscribe({
			next: (res) => {
				console.log(res);
				// create an state with loged the i use jwt from the server
			},
			error: (err) => {
				console.log(err);
				
			}
		});
	}
}
