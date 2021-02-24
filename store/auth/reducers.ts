import {
    AuthState,
    AuthActionTypes,
    LOG_IN,
    LOG_OUT,
    UPDATE_ACCESS_TOKEN
} from './types'

const initialState: AuthState = {
    loggedIn: false,
    accessToken: '',
    refreshToken: '',
    userId: null,
    role: null
}

export function authReducer(
    state = initialState,
    action: AuthActionTypes
): AuthState {
    switch (action.type) {
        case LOG_IN:
            return action.payload
        case LOG_OUT:
            return initialState
        case UPDATE_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.newToken
            }
        default:
            return state
    }
}