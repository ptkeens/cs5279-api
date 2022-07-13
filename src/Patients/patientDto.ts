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
    HirschprungDisease: string;
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
    HirschprungDisease: string;
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
    HirschprungDisease?: string;
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
    HirschprungDisease?: string;
    sort?: string;
    limit?: number;
    offset?: number;
}