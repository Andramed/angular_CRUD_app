import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GuardService } from '../services/guard.service';
import { LocalStoarageService } from '../services/local-stoarage.service';
import { catchError, map, switchMap } from 'rxjs/operators'; // Corectare: înlocuirea importului pentru operatori RxJS
import { Observable, of } from 'rxjs'; // Corectare: Adăugarea importului pentru operatorul 'of'
import { Store } from '@ngxs/store';
import { RemoveEmp } from '../services/storeNgxs/actions/saveEmp.actions';
import { ClearState } from '../services/storeNgxs/actions/saveDecodedToken.actions';
import { UserService } from '../services/user.service';

export const AuthGuard: CanActivateFn = (route, state) => {
	const guardService = inject(GuardService);
	const localStorage = inject(LocalStoarageService);
	const router = inject(Router);
	const store = inject(Store);
	const athorizeService = inject(UserService);
  
	const token = localStorage.get("myToken");
	console.log(token);
	athorizeService.authorize("tokenPresent");
  
	if (!token) {
	  return router.createUrlTree(['/signin']);
	} else {
	  return guardService.guard().pipe(
		switchMap(isExpired => {
		  if (isExpired) {
			store.dispatch(new RemoveEmp());
          	store.dispatch(new ClearState());
			router.navigate(['/signin']);

			return of(false); 
		  } 
		  else {
			
			return guardService.validateToken();
		  }
		}),
		catchError(() => of(false)) 
	  );
		return true
	}
  };
  



// return guardService.guard().pipe(
// 	switchMap((isExpired) => {
// 		if (isExpired) {
// 			// Token expirat, gestionăm acțiunile corespunzătoare și evităm ciclul infinit
// 			store.dispatch(new RemoveEmp());
// 			store.dispatch(new ClearState());
// 			router.navigate(['/signin']);
// 			return of(false);
// 		} else {
// 			// Token valid, continuăm cu fluxul normal
// 			athorizeService.authorize("tokenPresent");
// 			return of(true);
// 		}
// 	}),
// 	catchError(() => of(false)) // Tratează orice eroare și returnează false
// );

// if (!token) {
// 	// Verificare pentru evitarea redirecționării continue
// 	// if (router.url !== '/signin') {
// 	// 	store.dispatch(new RemoveEmp());
// 	// 	store.dispatch(new ClearState());
// 	// 	router.navigate(['/signin']);
// 	// }
// 	return false;
// }