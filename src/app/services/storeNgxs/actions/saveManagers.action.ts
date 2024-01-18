import { Manager } from 'src/app/interface/Manager';


export class SaveManagers {
	static readonly type = `[Manager state] save managers list in state`;
	constructor(public managers: Manager[]){}
}

export class RemoveManagers {
	static readonly type = `[Manager state] Remove managers list`
}