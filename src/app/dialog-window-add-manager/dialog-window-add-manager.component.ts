import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddManagerService} from '../services/add-manager.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog-window-add-manager',
  templateUrl: './dialog-window-add-manager.component.html',
  styleUrls: ['./dialog-window-add-manager.component.css']
})
export class DialogWindowAddManagerComponent {
	
	managerForm!: FormGroup

	constructor (
		private _formBuilder: FormBuilder,
		private addManager: AddManagerService,
		private dialogRef: DialogRef<DialogWindowAddManagerComponent>
	) {
		this.managerForm = this._formBuilder.group({
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		})
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
	



}
