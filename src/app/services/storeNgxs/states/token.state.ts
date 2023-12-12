import { Injectable } from '@angular/core';
import { Action,  State, StateContext } from '@ngxs/store';
import { modelJWT } from 'src/app/interface/JWT';
import { saveJWT } from '../actions/saveToken.action';

@State<modelJWT>({
	name: 'myToken',
	defaults: {
		tokenAcces: null
	}
})
@Injectable()
export class TokenState {
	@Action(saveJWT)
	saveJWT(ctx: StateContext<modelJWT>, _action: saveJWT) {
		const {JWT} = _action
		if (!JWT) {
			console.log('JWT not obtained for save this in state');
			return
		}
		const state = ctx.getState();
		ctx.setState({
			...state,
			tokenAcces: JWT
		})
 
	}
}