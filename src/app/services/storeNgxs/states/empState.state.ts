import { Selector, State, StateContext, Action } from "@ngxs/store";
import { Employe } from '../../../interface/Employee';
import { RemoveEmp, SaveEmp } from '../actions/saveEmp.actions';
import { Injectable } from '@angular/core';
import { state } from '@angular/animations';


export class EmpModel {
	emps!: Employe[]
}

@State<EmpModel>({
	name: 'empState',
	defaults: {
		emps: []
	}
})

@Injectable()
export class EmpState {
	@Action(SaveEmp)
	saveEmpInState(ctx: StateContext<EmpModel>, action: SaveEmp){
		const state = ctx.getState();
		console.log('state: ', state);
		
		const emps: Employe[] = action.emps
		console.log("Save emp , ", emps);
		
		ctx.setState({
			...state,
			emps: emps
		})
	} 

	@Action(RemoveEmp)
	removeEmpFromState(ctx: StateContext<Employe[]>, action: RemoveEmp) {
		const emps: [] = []
		ctx.setState([...emps])
	}
}
