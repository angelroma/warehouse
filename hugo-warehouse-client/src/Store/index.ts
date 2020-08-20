import { createStore } from "redux";
import { combineReducers } from "redux";
import { AuthReducer } from './Auth/auth.reducer'

const rootReducers = combineReducers({
  auth_reducer: AuthReducer
});

export type RootState = ReturnType<typeof rootReducers>

export default createStore(rootReducers);
