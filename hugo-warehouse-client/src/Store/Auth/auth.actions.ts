import { AuthActions, AuthState } from "../../Interfaces/auth.interface";

export const loginAction = (authState: AuthState): AuthActions => ({ type: "LOGIN", authState: authState });
export const logoutAction = (): AuthActions => ({ type: "LOGOUT", authState: { auth: null, isAuthenticated: false } });