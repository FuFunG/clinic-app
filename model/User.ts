export interface Doctor {
    name: string
    clinic: string
}

export interface Patient {
    name: string
    clinic: string
    phone: string
    address: string
}

export interface User extends Patient {
    id: number
    email: string
}