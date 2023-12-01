import { Component } from '@angular/core';
import {
	MatDialog,
	MAT_DIALOG_DATA, 
	MatDialogTitle,
	MatDialogContent
} from '@angular/material/dialog'
import { FormAuthComponent } from './form-auth/form-auth.component';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
	
	constructor(public dialog: MatDialog){}

	opentAuthDialog() {
		this.dialog.open(FormAuthComponent) 
	}

}
