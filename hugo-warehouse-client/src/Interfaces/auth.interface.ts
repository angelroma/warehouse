export interface Auth {
  id: number
  unique_name: string
  role: string
  nbf: number
  exp: number
  iat: number
}

export interface AuthState {
  auth: Auth | null,
  isAuthenticated: boolean | null
}

export interface AuthActions {
  type: "LOGIN" | "LOGOUT",
  authState: AuthState | null
}

export interface AuthLoginRequest {
  username: string,
  password: string
}

export interface AuthLoginResponseData {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  token: string;
  role: string;
}

export interface AuthLoginResponse {
  success: boolean;
  message: string;
  data: AuthLoginResponseData;
}
