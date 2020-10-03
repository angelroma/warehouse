import { AuthState } from "../../Entitites/Auth/interface";
import { AuthActionTypes, LOGIN_USER, LOGOUT_USER } from "./types";

const initialState: AuthState = {
  user: null,
  isAuthenticated: null
};

export default function authReducer(
  state = initialState,
  action: AuthActionTypes
): AuthState {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, ...action.payload };
    case LOGOUT_USER:
      return { ...state, ...action.payload };
    default:
      return state
  }
}