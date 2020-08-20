import { api } from "../Utils/api.util"
import { AuthLoginRequest, AuthLoginResponse, Auth, AuthState } from "../Interfaces/auth.interface"
import jwtdecode from 'jwt-decode'
import { loginAction, logoutAction } from "../Store/Auth/auth.actions";
import Store from "../Store";

export const loginService = async (credentials: AuthLoginRequest): Promise<boolean> => {
  try {
    const response = await api.post('/auth/login', credentials);
    const data: AuthLoginResponse = response.data;
    localStorage.setItem("token", data.data.token);
    const decodedToken: Auth = jwtdecode(data.data.token)
    const authState:AuthState = {
      auth: decodedToken,
      isAuthenticated:true
    }
   Store.dispatch(loginAction(authState));

    return true;
  }
  catch (e) {
    console.error("Error on login service", e.message)

    Store.dispatch(logoutAction());
    throw new Error("Error al identificarse, contacte al administrador.");
  }
}

export const loginByStorageService = async (): Promise<boolean> => {
  try {
    // console.log("Trying to log in by local storage");
    const token: string | null = localStorage.getItem("token");
    if (token === null) throw new Error("There is not token stored at the local storage");
    const decodedToken: Auth = jwtdecode(token);

    const authState:AuthState = {
      auth: decodedToken,
      isAuthenticated: true
    }

    Store.dispatch(loginAction(authState));
    return true;
  }
  catch (e) {
    console.error("Error on login by token service", e.message)
    Store.dispatch(logoutAction());
    return false;
  }
}