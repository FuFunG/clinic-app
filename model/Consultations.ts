import { Doctor, Patient } from "./User";

export interface Consultation {
    id: number
    clinic: string
    diagnosis: string
    medication: string
    consultationFee: number
    date: string
    time: string
    followUp: boolean
    doctor: Doctor
    patient: Patient
}