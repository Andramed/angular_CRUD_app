import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GuardService } from '../services/guard.service';
import { LocalStoarageService } from '../services/local-stoarage.service';
import { map } from 'rxjs';
import { Store } from '@ngxs/store';
import { RemoveEmp } from '../services/storeNgxs/actions/saveEmp.actions';
import { ClearState } from '../services/storeNgxs/actions/saveDecodedToken.actions';
import { UserService } from '../services/user.service';


export const AuthGuard: CanActivateFn = (route, state) => {
	const guardService = inject(GuardService);
	const localStorage = inject(LocalStoarageService);
	const router = inject(Router);
	const store = inject(Store);
	const athorizeService = inject(UserService)

	const token = localStorage.get("myToken");
	console.log(token);
	

	if (!token) {
		store.dispatch(new RemoveEmp());
		store.dispatch(new ClearState());
		router.navigate(['/signin']);
		return false
	}

	return guardService.guard().pipe(
		map((value) => {
			if (value) {
				console.log(token);
				
				store.dispatch(new RemoveEmp());
				console.log("update state");
				
				store.dispatch(new ClearState());
				router.navigate(['/signin']);
				return false
			} else {
				athorizeService.authorize("tokenPresent")
			}

			return true
		})
	)
}