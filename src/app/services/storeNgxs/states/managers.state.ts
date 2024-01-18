import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Manager } from 'src/app/interface/Manager';
import { RemoveManagers, SaveManagers } from '../actions/saveManagers.action';

export class ManagersModel {
	managers!: Manager[]
}

@State<ManagersModel>({
	name: `managerState`,
	defaults: {
		managers: []
	}
})


@Injectable()

export class ManagersState {
	@Action(SaveManagers)
	saveManagersState(ctx: StateContext<ManagersModel>, action: SaveManagers) {
		const state = ctx.getState();
		const managers:Manager[] = action.managers

		ctx.setState({
			...state,
			managers: managers
		})
	}

	@Action(RemoveManagers)
	removeManagersFromState(ctx: StateContext<ManagersModel>, action: RemoveManagers) {
	const state = ctx.getState();
	ctx.patchState({
		...state,
		managers: []
	});
}
}