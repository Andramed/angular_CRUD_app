import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogWindowAddManagerComponent } from '../dialog-window-add-manager/dialog-window-add-manager.component';
import { ManagerService } from 'src/app/services/manager.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Manager } from 'src/app/interface/Manager';
import { Select, Store } from '@ngxs/store';
import { SaveManagers } from 'src/app/services/storeNgxs/actions/saveManagers.action';
import { ManagersListSelector } from 'src/app/services/storeNgxs/selectors/managers.selector';
import { Observable } from 'rxjs';
import { ManagerModel } from 'src/app/interface/ManagerModel';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit, AfterViewInit {
	displayedColumns: string[] = ["id", "email", "firstName", "lastName", "action"];
	dataSource!: MatTableDataSource<Manager> 
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	constructor(
		private _dialog: MatDialog,
		private manager: ManagerService,
	) {}
	@Select(ManagersListSelector.list) list$!: Observable<Manager[]>
	ngOnInit(): void {
		this.manager.getDataChanged()
		this.list$.subscribe({
			next: (list) => {
				this.dataSource = new MatTableDataSource(list)
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			},
			error: (err) => console.log(err)
		})
	}
	ngAfterViewInit(): void {
	}
	openDialogWindow() {
		this._dialog.open(DialogWindowAddManagerComponent)
	}
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	
		if (this.dataSource.paginator) {
		  this.dataSource.paginator.firstPage();
		}
	}

	openEditManager(data: ManagerModel, location:string){
		this._dialog.open(DialogWindowAddManagerComponent, {
			data,
		});
	}

	deleteManager(id: number) {
		this.manager.deleteManager(id).subscribe({
			next: (res) => {
				if (res.ok) {
					this.manager.getDataChanged();
				}
			},

			error: (err) => {
				console.log(err);
				
			}
		})
		
	}

}
