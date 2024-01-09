import { Injectable } from '@angular/core';
import { Action,  State, StateContext } from '@ngxs/store';
import { AuthState } from '../../../interface/AuthState';

import { ClearState, SaveDecodedJWT } from '../actions/saveDecodedToken.actions';
import { DecodedTokenInerface } from 'src/app/interface/DecodedToken';

@State<DecodedTokenInerface>({
	name: 'decodedJWT',
	defaults: {
		email: undefined,
		exp: undefined,
		iat: undefined,
		role: undefined,
		sub: undefined,
		isAuthorized:undefined,
		firtsName:undefined,
		lastName:undefined
	}
})



@Injectable()
export class DecodedState {

	@Action(SaveDecodedJWT)
	loginUser(ctx: StateContext<DecodedTokenInerface>, _action: SaveDecodedJWT) {
		console.log({
			location: "Decode state action check user info decoded"
			,userinfo: _action.userInfo
		});
		
		const {email, sub, role, firtsName, lastName } = _action.userInfo
		const state = ctx.getState();
		ctx.setState({
			...state,
			email: email,
			sub: sub,
			role: role,
			isAuthorized: _action.isAuthorized,
			firtsName: firtsName,
			lastName: lastName
		})
		
	} 

	@Action(ClearState)
	logoutUser(ctx: StateContext<DecodedTokenInerface>, _action: ClearState) {
		
		const state = ctx.getState();
		ctx.setState({
			...state,
			email: undefined,
			sub: undefined,
			role: undefined,
			isAuthorized: false,
			firtsName: undefined,
			lastName: undefined
		})
	}

}