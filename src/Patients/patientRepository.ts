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
            PatientEntity.validateYesNo(patientCreate.hirschprungDisease)
        ];

        try {
            const conn = await DatabaseService.getConnection();
            const result = await conn.execute<ResultSetHeader>(query, params);

            return result.length ? result[0].insertId : 0;
        } catch (err) {
            console.log(err);
            throw new DatabaseError('Error when creating patient!');
        }
    }

    update = async (id: number, params: UpdatePatientDto) : Promise<number> => {
        let query = `UPDATE ${this.table} SET `;
        const groupedParams = [];
        const values = []

        for (const [key, value] of Object.entries(params)) {
            groupedParams.push(`${key} = ?`);

            // validate input
            switch (key) {
                case 'gender':
                    values.push(
                        PatientEntity.validateGender(value)
                    );
                break;
                case 'dob':
                    values.push(
                        PatientEntity.validateDob(value)
                    );
                break;
                case 'mutation':
                    values.push(
                        PatientEntity.validateMutation(value)
                    );
                break;
                case 'ventilatorySupportMethod':
                    values.push(
                        PatientEntity.validateVentilatorySupport(value)
                    );
                break;
                case 'ventilatorySupportHours':
                    values.push(
                        PatientEntity.validateSupportHours(value)
                    );
                break;
                case 'ageOfDiagnosis':
                    values.push(
                        PatientEntity.validateAgeOfDiagnosis(value)
                    );
                break;
                case 'cardiacArrhythmias':
                case 'cardiacPacemaker':
                case 'hirschprungDisease':
                    values.push(
                        PatientEntity.validateYesNo(value)
                    );
                break;

                default:
                    values.push(value);
            }
        }

        query += groupedParams.join(', ');
        query += ` WHERE id = ?`;
        values.push(PatientEntity.validateId(id));

        try {
            const conn = await DatabaseService.getConnection();
            const result = await conn.execute<ResultSetHeader>(query, values);

            return result ? result[0].affectedRows : 0;
        } catch (err) {
            console.log(err);
            throw new DatabaseError(`Error when updating patient ${id}`);
        }
    }

    delete = async (id: number) : Promise<number> => {
        let query = `DELETE FROM ${this.table} WHERE id=?`;
        let params = [ PatientEntity.validateId(id) ];

        try {
            const conn = await DatabaseService.getConnection();
            const result = await conn.execute<ResultSetHeader>(query, params);

            return result ? result[0].affectedRows : 0;
        } catch (err) {
            console.log(err);
            throw new DatabaseError(`Error when deleting patient ${id}!`);
        }
    }

    search = async (patientSearch: PatientSearchDto) : Promise<PatientDto[]> => {
        const qb = new QueryBuilder();
        const params: any[] = [];
        const results: PatientDto[] = [];
        let query;
        
        qb.setFrom(this.table);

        if (patientSearch.id) {
            qb.addWhere('id = ?');
            params.push(PatientEntity.validateId(patientSearch.id));
        }

        if (patientSearch.limit) {
            let num = Number(patientSearch.limit);
            if (!isNaN(num)) {
                qb.setLimit(num);
            } else {
                delete patientSearch.limit;
            }
        }

        if (patientSearch.offset) {
            let num = Number(patientSearch.offset);
            if (!isNaN(num)) {
                qb.setOffset(num);
            } else {
                delete patientSearch.offset;
            }            
        }

        if (patientSearch.gender) {
            qb.addWhere('gender = ?');
            params.push(PatientEntity.validateGender(patientSearch.gender));
        }

        if (patientSearch.mutation) {
            qb.addWhere('mutation = ?');
            params.push(PatientEntity.validateMutation(patientSearch.mutation));
        }

        if (patientSearch.ventilatorySupportMethod) {
            qb.addWhere('ventilatorySupportMethod = ?');
            params.push(PatientEntity.validateVentilatorySupport(patientSearch.ventilatorySupportMethod));
        }

        if (patientSearch.ventilatorySupportHours) {
            qb.addWhere('ventilatorySupportHours = ?');
            params.push(PatientEntity.validateSupportHours(patientSearch.ventilatorySupportHours));
        }


        if (patientSearch.sort) {
            qb.addSort(patientSearch.sort);
        }

        query = qb.buildQuery();

        try {
            const conn = await DatabaseService.getConnection();
            const [ rows ] = await conn.execute<RowDataPacket[]>(query, params);

            if (rows) {
                for (let i in rows) {
                    results.push(rows[i] as PatientDto);
                }
            }
        } catch (err) {
            console.log(err);
            throw new DatabaseError('Error when searching users!');
        }


        return results;
    }
    
}