import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { FormAuthComponent } from 'src/app/auth/form-auth/form-auth.component';
import { LocalStoarageService } from 'src/app/services/local-stoarage.service';
import { RemoveEmp } from 'src/app/services/storeNgxs/actions/saveEmp.actions';
import { Router } from '@angular/router';
import { ClearState, SaveDecodedJWT } from 'src/app/services/storeNgxs/actions/saveDecodedToken.actions';
import { ClearJwt } from 'src/app/services/storeNgxs/actions/saveToken.action';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

	constructor(
		private localStorage: LocalStoarageService,
		private store: Store,
		private _dialog: MatDialog,
		private route: Router
	) {

	}
	
	logout(){
		this.localStorage.remov('myToken');
		this.store.dispatch(new RemoveEmp());
		this.store.dispatch(new ClearState());
		this.store.dispatch(new ClearJwt());
		this.route.navigate(['/signin'])
	}
}
