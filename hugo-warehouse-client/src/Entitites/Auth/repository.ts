import { api } from '../../Utils/api.util'
import { AuthLoginRequest, Token } from '../../Entitites/Auth/interface'
import { loginUser, logoutUser } from '../../Store/Auth/actions'
import store from '../../Store'
import jwtDecode from 'jwt-decode'
import { AxiosResponse } from 'axios'

export const login = async (request: AuthLoginRequest): Promise<AxiosResponse<any>> => {
  try {
    const response = await api.post('./auth/login', request)
    console.log("login response", response);
    const token: string = response.data.data.token
    const decoded: Token = await jwtDecode(token);
    localStorage.setItem("token", token)
    store.dispatch(loginUser(decoded));
    return response;
  }
  catch (e) {
    store.dispatch(logoutUser())
    console.log("Error on login", e)
    throw e
  }
}

export const loginByToken = async (): Promise<any> => {
  console.log("Attemping to login by token.")
  try {
    const token = localStorage.getItem("token");
    if (token === null) throw new Error("Token not found!");
    const decoded: Token = await jwtDecode(token);
    store.dispatch(loginUser(decoded));
    return token
  }
  catch (e) {
    console.error(e);
    store.dispatch(logoutUser());
  }
}

export const logout = async () => {
  localStorage.removeItem("token");
  store.dispatch(logoutUser())
}

