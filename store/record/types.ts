export const RECORD_INIT = 'RECORD_INIT'
export const UPDATE_DOCTOR_ID = 'UPDATE_DOCTOR_ID'
export const UPDATE_PATIENT_ID = 'UPDATE_PATIENT_ID'

export interface RecordState {
    doctorId: number | null
    patientId: number | null
}

interface RecordInit {
    type: typeof RECORD_INIT
}

interface UpdateDoctorId {
    type: typeof UPDATE_DOCTOR_ID
    doctorId: number
}

interface UpdatePatientId {
    type: typeof UPDATE_PATIENT_ID,
    patientId: number
}

export type RecordType = RecordInit | UpdateDoctorId | UpdatePatientId