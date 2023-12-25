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
		console.log({
			message: "log from token state",
			_action
		});
		
		
		const {JWT} = _action
		
		const state = ctx.getState();
		ctx.setState({
			...state,
			tokenAcces: JWT
		})
	}
}