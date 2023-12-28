import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { SignInService } from 'src/app/services/sign-in.service';
import { Store } from '@ngxs/store';
import { MatDialogRef } from '@angular/material/dialog';

import { saveJWT } from '../../services/storeNgxs/actions/saveToken.action';

import { JWTServiceService } from 'src/app/services/jwtservice.service';
import { SaveDecodedJWT } from 'src/app/services/storeNgxs/actions/saveDecodedToken.actions';
import { UserService } from 'src/app/services/user.service';



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
		private userService: UserService,
		private store: Store,
		private _dialogRef: MatDialogRef<FormAuthComponent>,
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
			this._dialogRef.close();
 			this._signInService.signIn({email, password}).subscribe({
				next: (res) => {
					if (res.ok) { 
						
						const token = res.body.tokenAcces
						if (token) {
							this.store.dispatch(new saveJWT(token));
							console.log({
								message: "token saved in local store",
								tokeFromStore: localStorage.getItem("myToken")
							});
							
							this.userService.authorize("signIn");
							console.log({
								message: "service authorize finished",

							});
							
							this._dialogRef.close();
						} 
					}
				},
				error(err) {
					console.error(err);
					
				},
			})
	
	}
}




