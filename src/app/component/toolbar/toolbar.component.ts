import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { FormAuthComponent } from 'src/app/auth/form-auth/form-auth.component';
import { LocalStoarageService } from 'src/app/services/local-stoarage.service';
import { RemoveEmp } from 'src/app/services/storeNgxs/actions/saveEmp.actions';
import { Router } from '@angular/router';
import { ClearState, SaveDecodedJWT } from 'src/app/services/storeNgxs/actions/saveDecodedToken.actions';
import { ClearJwt } from 'src/app/services/storeNgxs/actions/saveToken.action';
import { UserSelector } from 'src/app/services/storeNgxs/selectors/authenticatedUser.selector';
import { Observable } from 'rxjs';
import { DecodedTokenInerface } from 'src/app/interface/DecodedToken';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
	loggedUser!: {
		[key:string]: string | undefined
	}
	constructor(
		private localStorage: LocalStoarageService,
		private store: Store,
		private _dialog: MatDialog,
		private route: Router
	) {

	}
	@Select(UserSelector.userLoged) userLogedNgxs$!: Observable<DecodedTokenInerface>

	ngOnInit(): void {
		this.userLogedNgxs$.subscribe({
			next: (user) => { 
				console.log({
					location: "Initalizing toolbar component"
					,user
				});
				if (user) {
					if (!user.firtsName && !user.lastName) {
						this.route.navigate(['/settings'])

					} 
					this.loggedUser = {
						firstName: user.firtsName,
						lastName: user.lastName
					}
				}
			}
		})
	}


	logout(){
		this.localStorage.remov('myToken');
		this.store.dispatch(new RemoveEmp());
		this.store.dispatch(new ClearState());
		this.store.dispatch(new ClearJwt());
		this.route.navigate(['/signin'])
	}
}
