import { AuthState } from "../../Entitites/Auth/interface";

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

interface LoginAction {
    type: typeof LOGIN_USER
    payload: AuthState
}

interface LogoutAction {
    type: typeof LOGOUT_USER,
    payload: AuthState
}

export type AuthActionTypes = LoginAction | LogoutAction