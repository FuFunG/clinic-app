import {
    RecordState,
    RecordType,
    RECORD_INIT,
    UPDATE_DOCTOR_ID,
    UPDATE_PATIENT_ID
} from './types'

const initialState: RecordState = {
    doctorId: null,
    patientId: null
}

export function recordReducer(
    state = initialState,
    action: RecordType
): RecordState {
    switch (action.type) {
        case RECORD_INIT:
            return initialState
        case UPDATE_DOCTOR_ID:
            return {
                ...state,
                doctorId: action.doctorId
            }
        case UPDATE_PATIENT_ID:
            return {
                ...state,
                patientId: action.patientId
            }
        default:
            return state
    }
}