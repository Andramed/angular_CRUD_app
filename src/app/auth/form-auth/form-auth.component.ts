import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { SignInService } from 'src/app/services/sign-in.service';
import { Store } from '@ngxs/store';
import { SignUpService } from 'src/app/services/sign-up.service';
import { saveJWT } from '../../services/storeNgxs/actions/saveToken.action';

import { JWTServiceService } from 'src/app/services/jwtservice.service';
import { SaveDecodedJWT } from 'src/app/services/storeNgxs/actions/saveDecodedToken.actions';



@Component({
  selector: 'app-form-auth',
  templateUrl: './form-auth.component.html',
  styleUrls: ['./form-auth.component.css']
})
export class FormAuthComponent {
	signInForm!: FormGroup;
	signUp!: boolean
	constructor(
		private _formBuilder: FormBuilder,
		private _signInService: SignInService,
		private _signUpService: SignUpService,
		private store: Store,
		private _dialogRef: DialogRef<FormAuthComponent>,
		private jwtService: JWTServiceService
	) {
		this.signInForm = this._formBuilder.group({
			email: '',
			password: '',
		})
	}

	switcherSignInOrSignUp() {
		this.signUp ? this.signUp = false : this.signUp = true 
	}

	submitForm() {
		
			const {email, password} = this.signInForm.value;
			console.log(email, password);
			// to dispatch for saving new state of JWT obtained from the server
 			this._signInService.signIn({email, password}).subscribe({
				next: (res) => {
					if (res) { 
						//JWT received and we store this in state then user login
						this.store.dispatch(new saveJWT(res.body.accesToken));					
						this._dialogRef.close();
					}
				},
				error(err) {
					console.log(err);
				},
			})
		

		
	}
}




