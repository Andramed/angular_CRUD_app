import { DecodedTokenInerface } from 'src/app/interface/DecodedToken';



export class SaveDecodedJWT {
	static readonly type = `[User info] Decoded User Info`;
	constructor(
		public userInfo: DecodedTokenInerface,
		public isAuthorized: boolean
		) {}
}