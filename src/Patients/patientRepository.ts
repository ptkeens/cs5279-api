import { CreatePatientDto, PatientDto, UpdatePatientDto, PatientSearchDto } from "./patientDto";
import { SchemaRepository } from "../Framework/schemaRepository";
import { PatientEntity } from "./patientEntity";
import { DatabaseError } from "../Database/databaseError";
import { DatabaseService } from "../Database/databaseService";
import { QueryBuilder } from '../Database/queryBuilder';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export interface PatientRepositoryInterface {
    create (params: CreatePatientDto) : Promise<number>;
    update (id: number, params: UpdatePatientDto) : Promise<number>;
    delete (id: number) : Promise<number>;
    search (patientSearch: PatientSearchDto) : Promise<PatientDto[]>;
}


export class PatientRepository extends SchemaRepository implements PatientRepositoryInterface {

    constructor() {
        super();
        this.table = 'patients';
    }

    create = async (patientCreate: CreatePatientDto) : Promise<number> => {
        let query = `INSERT INTO ${this.table} SET
            gender = ?,
            dob = ?,
            mutation = ?,
            ventilatorySupportMethod = ?,
            ventilatorySupportHours = ?,
            ageOfDiagnosis = ?,
            cardiacArrhythmias = ?,
            cardiacPacemaker = ?,
            hirschprungDisease = ?
    `;

    let params = [
        PatientEntity.validateGender(patientCreate.gender),
        PatientEntity.validateDob(patientCreate.dob),
        PatientEntity.validateMutation(patientCreate.mutation),
        PatientEntity.validateVentilatorySupport(patientCreate.ventilatorySupportMethod),
        PatientEntity.validateSupportHours(patientCreate.ventilatorySupportHours),
        PatientEntity.validateAgeOfDiagnosis(patientCreate.ageOfDiagnosis),
        PatientEntity.validateYesNo(patientCreate.cardiacArrhythmias),
        PatientEntity.validateYesNo(patientCreate.cardiacPacemaker),
        PatientEntity.validateYesNo(patientCreate.HirschprungDisease)
    ];

    try {
        const conn = await DatabaseService.getConnection();
        const result = await conn.execute<ResultSetHeader>(query, params);

        return result.length ? result[0].insertId : 0;
    } catch (err) {
        console.log(err);
        throw new DatabaseError('Error when creating user!');
    }
    }

    update = async (id: number, params: UpdatePatientDto) : Promise<number> => {
        return 1;
    }

    delete = async (id: number) : Promise<number> => {
        return 1;
    }

    search = async (patientSearch: PatientSearchDto) : Promise<PatientDto[]> => {
        const patientCollection : PatientDto[] = [];

        return patientCollection;
    }
    
}