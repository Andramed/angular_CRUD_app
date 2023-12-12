import {  Selector } from '@ngxs/store';
import { modelJWT } from 'src/app/interface/JWT';
import { TokenState } from '../states/token.state';




export class JWTSelector {
	
	@Selector([TokenState])
	static jwt(state: modelJWT) : string | void  {
		if (state.tokenAcces) {
			return state.tokenAcces
		}
		return
	} 

}