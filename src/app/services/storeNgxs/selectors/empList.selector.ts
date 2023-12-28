import { Selector } from "@ngxs/store";
import { EmpState, EmpModel } from "../states/empState.state";
import { Employe } from '../../../interface/Employee';

export class EmpListSelector {

	@Selector([EmpState])
	static list(state: EmpModel): Employe[] | string {
		
			if (state) {
				return state.emps
			}

			return "state not obtained"
		
	}

  }

