

export class saveJWT {
	static readonly type = `[JWT] Save JWT`
	constructor (public JWT: string) {}
}

export class ClearJwt {
	static readonly type = `[JWT] clear jwt`
	constructor() {
		console.log('state form jwt deleted');
		
	}
}

