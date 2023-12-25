import { Injectable } from '@angular/core';
import { Action,  State, StateContext } from '@ngxs/store';
import { AuthState } from '../../../interface/AuthState';

import { SaveDecodedJWT } from '../actions/saveDecodedToken.actions';
import { DecodedTokenInerface } from 'src/app/interface/DecodedToken';

@State<DecodedTokenInerface>({
	name: 'decodedJWT',
	defaults: {
		email: undefined,
		exp: undefined,
		iat: undefined,
		role: undefined,
		sub: undefined,
		isAuthorized:undefined
		
	}
})



@Injectable()
export class DecodedState {

	@Action(SaveDecodedJWT)
	loginUser(ctx: StateContext<DecodedTokenInerface>, _action: SaveDecodedJWT) {
		const {email, sub, role} = _action.userInfo
		const state = ctx.getState();
		ctx.setState({
			...state,
			email: email,
			sub: sub,
			role: role,
			isAuthorized: _action.isAuthorized
		})
		
	}

}