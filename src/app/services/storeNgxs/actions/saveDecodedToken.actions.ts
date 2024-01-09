import { DecodedTokenInerface } from 'src/app/interface/DecodedToken';



export class SaveDecodedJWT {
	static readonly type = `[JWT state] save decode user info`;
	constructor(
		public userInfo: DecodedTokenInerface,
		public isAuthorized: boolean
		) {} 
}

export class ClearState {
	static readonly type = `[JWT state] clear user info from state`
	constructor(

	) {}
} 