export interface PatientDto {
    id: number;
    gender: string;
    dob: string|Date;
    mutation: string;
    ventilatorySupportMethod: string;
    ventilatorySupportHours: string;
    ageOfDiagnosis: number;
    cardiacArrhythmias: string;
    cardiacPacemaker: string;
    hirschprungDisease: string;
}

export interface CreatePatientDto {
    gender: string;
    dob: string|Date;
    mutation: string;
    ventilatorySupportMethod: string;
    ventilatorySupportHours: string;
    ageOfDiagnosis: number;
    cardiacArrhythmias: string;
    cardiacPacemaker: string;
    hirschprungDisease: string;
}

export interface UpdatePatientDto {
    gender?: string;
    dob?: string|Date;
    mutation?: string;
    ventilatorySupportMethod?: string;
    ventilatorySupportHours?: string;
    ageOfDiagnosis?: number;
    cardiacArrhythmias?: string;
    cardiacPacemaker?: string;
    hirschprungDisease?: string;
}

export interface PatientSearchDto {
    id?: number;
    gender?: string;
    dob?: string|Date;
    mutation?: string;
    ventilatorySupportMethod?: string;
    ventilatorySupportHours?: string;
    ageOfDiagnosis?: number;
    cardiacArrhythmias?: string;
    cardiacPacemaker?: string;
    hirschprungDisease?: string;
    sort?: string;
    limit?: number;
    offset?: number;
}