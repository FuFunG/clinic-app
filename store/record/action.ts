import { RecordType, RECORD_INIT, UPDATE_DOCTOR_ID, UPDATE_PATIENT_ID } from './types'

export function updateDoctorId(id: number): RecordType {
    return {
        type: UPDATE_DOCTOR_ID,
        doctorId: id
    }
}

export function updatePatientId(id: number): RecordType {
    return {
        type: UPDATE_PATIENT_ID,
        patientId: id
    }
}

export function initRecord(): RecordType {
    return {
        type: RECORD_INIT
    }
}