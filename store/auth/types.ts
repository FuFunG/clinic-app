
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN'

export interface UserInfo {
    accessToken: string
    refreshToken: string
    userId: number | null
    role: string | null
}

export interface AuthState extends UserInfo {
    loggedIn: boolean,
}

interface LogInAction {
    type: typeof LOG_IN
    payload: AuthState
}

interface LogOutAction {
    type: typeof LOG_OUT
}

interface UpdateAccessTokenAction {
    type: typeof UPDATE_ACCESS_TOKEN,
    newToken: string
}

export type AuthActionTypes = LogInAction | LogOutAction | UpdateAccessTokenAction