import { Selector } from '@ngxs/store';
import { ManagersModel, ManagersState } from '../states/managers.state';
import { Manager } from 'src/app/interface/Manager';


export class ManagersListSelector {

	@Selector([ManagersState])

	static list (state: ManagersModel) : Manager[] | string {
		if (state) {
			return state.managers
		}

		return "state not obtained"
	}
}