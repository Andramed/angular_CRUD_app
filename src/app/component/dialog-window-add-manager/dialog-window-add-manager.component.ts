import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AddManagerService} from '../../services/add-manager.service';


import { DialogRef } from '@angular/cdk/dialog';

import {InputValidatorService} from '../../services/input-validator.service'
import { ManagerService } from 'src/app/services/manager.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManagerModel } from 'src/app/interface/ManagerModel';
@Component({
  selector: 'app-dialog-window-add-manager',
  templateUrl: './dialog-window-add-manager.component.html',
  styleUrls: ['./dialog-window-add-manager.component.css']
})
export class DialogWindowAddManagerComponent implements OnInit{
	action: string = "Add new manager";
	actionBtn:string = "add";
	passwordRequire = true;
	requirmentsFor!: [string, string]
	managerForm!: FormGroup;
	requirmentsActive!: boolean
	edit: boolean = false;
	create: boolean = true

	constructor (
		private _formBuilder: FormBuilder,
		private addManager: AddManagerService,
		private dialogRef: DialogRef<DialogWindowAddManagerComponent>,
		private validator: InputValidatorService,
		private manager: ManagerService,
		@Inject(MAT_DIALOG_DATA) public data: ManagerModel
	) {
		if (this.data) {
			this.action = `Update manager ${this.data.firstName}`
			this.actionBtn = "update";
			this.passwordRequire = false;
			this.edit = true;
			this.create = false
		}
		this.managerForm = this._formBuilder.group({
			firstName: ['', [Validators.required, this.validator.firstNameValidator()]],
			lastName: ['', [Validators.required, this.validator.firstNameValidator()]],
			email: ['', [Validators.required, Validators.email]], 
			password: ['', this.passwordRequire?  [Validators.required, this.validator.passwordValidator()] : []] 
		});

	}

	ngOnInit(): void {
	
		this.managerForm.patchValue(this.data)
	}


	onSubmit() {
		this.create ? this.createNewManager() : this.editManager()
	}
 
	createNewManager() {
		console.log('create new manager');
		const {email, password, firstName, lastName} = this.managerForm.value;
			console.log(this.managerForm.value);
			
			this.addManager.signUp({email, password, firstName, lastName})
				.subscribe({
					next: (res) => {
						if (res) {
							
							if (res.status) {
								this.dialogRef.close();
								this.manager.getDataChanged()
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

	editManager() {
		const data = () => {
			return Object.fromEntries(Object.entries(this.managerForm.value)
				.filter(value => value[1] !== "")
			)
		}
		if (this.data?.id) {
			console.log("query data");
			
			this.manager.editManager(this.data.id, data()).subscribe({
				next: (res) => {
					console.log(res);
					
					if (res.ok) {
						this.dialogRef.close();
						this.manager.getDataChanged()
					}
				},
				error: (err) => {
					console.log(err);
										
				}
			})
		}	
	}

	


	setRequirment(value: [string, string]) {
	this.requirmentsFor = [...value]
	}

	  insetRequrments() {
		this.requirmentsFor = ['', '']
	  }


}
