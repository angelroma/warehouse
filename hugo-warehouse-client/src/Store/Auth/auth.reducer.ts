import { AuthState, AuthActions } from "../../Interfaces/auth.interface"

const initialState: AuthState = {
  auth: null,
  isAuthenticated: null
}
export function AuthReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, state, action.authState)
    case 'LOGOUT':
      return Object.assign({}, state, action.authState)
    default:
      return state
  }
}
