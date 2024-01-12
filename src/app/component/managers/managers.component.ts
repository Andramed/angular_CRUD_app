import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowAddManagerComponent } from '../dialog-window-add-manager/dialog-window-add-manager.component';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {
	constructor(
		private _dialog: MatDialog,
		private manager: ManagerService
	) {}

	ngOnInit(): void {
		this.manager.getManager().subscribe({
			next: (managers ) => {
				console.log(managers);
				
			},

			error: (err) => {
				console.log(err);
				
			}
		})
	}
	openDialogWindow() {
		this._dialog.open(DialogWindowAddManagerComponent)
	}
}
