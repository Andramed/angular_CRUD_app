

import { State, Action, StateContext } from '@ngxs/store';
import { ClearJWTStates } from '../actions/clearState.actions';

export interface JWTStateModel {
  jwt: string;
  decodedJWT: string;
}

@State<JWTStateModel>({
  name: 'jwt',
  defaults: {
    jwt: '',
    decodedJWT: ''
  }
})
export class JWTState {
  @Action(ClearJWTStates)
  clearJWTStates({ setState }: StateContext<JWTStateModel>) {
    setState({ jwt: '', decodedJWT: '' });
  }
}
