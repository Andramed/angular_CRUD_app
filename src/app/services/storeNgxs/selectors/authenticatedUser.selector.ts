import { Selector } from '@ngxs/store';

import { AuthState } from '../../../interface/AuthState';
import { User } from '../../../interface/User';
import { DecodedState } from '../states/user.state';
import { DecodedTokenInerface } from 'src/app/interface/DecodedToken';




export class UserSelector {

	@Selector([DecodedState ])
	static userLoged(state: DecodedTokenInerface): DecodedTokenInerface | void {
		if (state) {
			return {
				email: state.email,
				sub: state.sub,
				role: state.role,
				isAuthorized: state.isAuthorized,
				firtsName: state.firtsName,
				lastName: state.lastName
			}
			
		}
		return 
	}

}