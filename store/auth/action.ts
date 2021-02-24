import { AuthState, LOG_IN, LOG_OUT, UPDATE_ACCESS_TOKEN, AuthActionTypes } from './types'

export function login(loginPayload: AuthState): AuthActionTypes {
    return {
        type: LOG_IN,
        payload: loginPayload
    }
}

export function logout(): AuthActionTypes {
    return {
        type: LOG_OUT,
    }
}

export function updateAccessToken(newToken: string): AuthActionTypes {
    return {
        type: UPDATE_ACCESS_TOKEN,
        newToken
    }
}