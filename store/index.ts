import { combineReducers } from 'redux'
import { connect, ConnectedProps } from "react-redux";

import { authReducer } from "./auth/reducers"
import { login, logout, updateAccessToken } from "./auth/action";
import { AuthState } from "./auth/types";
import { recordReducer } from "./record/reducers"
import { initRecord, updateDoctorId, updatePatientId } from './record/action';

export const rootReducer = combineReducers({
    auth: authReducer,
    record: recordReducer
})

export type RootState = ReturnType<typeof rootReducer>