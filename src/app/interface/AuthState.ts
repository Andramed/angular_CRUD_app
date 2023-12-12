import { User } from './User';

export interface AuthState {
	isAuthenticated: boolean;
  	user: User | null;
  	error: null | string;
}