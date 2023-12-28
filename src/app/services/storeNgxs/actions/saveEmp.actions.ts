import {Employe} from "../../../interface/Employee"

export class SaveEmp {
	static readonly type = `[user] Save Emp List`
	constructor (public emps: Employe[]){}
}

export class RemoveEmp {
	static readonly type = `[user] Remove Emp List`
	
}