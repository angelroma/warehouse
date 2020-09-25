import { Token } from "../../Entitites/Auth/interface";

// import { Payload } from "./interfaces";
import { LOGIN_USER, LOGOUT_USER, AuthActionTypes } from "./types";

// export function loginSuccess(token: Token) {
//     return {
//         actionType: "LOGIN_USER_SUCCESS",
//         state: {
//             user: token,
//             isAuthenticated: true
//         }
//     } as Payload
// }

// export function loginFailure(): Payload {
//     return {
//         actionType: "LOGOUT_USER",
//         state: {
//             user: null,
//             isAuthenticated: false
//         }
//     } as Payload
// }

export function loginUser(token: Token): AuthActionTypes {
    return {
        type: LOGIN_USER,
        payload: {
            user: token,
            isAuthenticated: true
        }
    }
}

export function logoutUser(): AuthActionTypes {
    return {
        type: LOGOUT_USER,
        payload: {
            user: null,
            isAuthenticated: false
        }
    }
}