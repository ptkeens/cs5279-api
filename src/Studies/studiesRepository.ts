import { StudiesDto, CreateStudiesDto, StudiesSearchDto, UpdateStudiesDto } from './studiesDto';
import { SchemaRepository } from "../Framework/schemaRepository";
import { DatabaseService } from '../Database/databaseService';
import { DatabaseError } from '../Database/databaseError';
import { QueryBuilder } from '../Database/queryBuilder';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { StudiesEntity } from './studiesEntity';

export interface StudiesRepositoryInterface {
    create (params: CreateStudiesDto) : Promise<number>;
    update (id: number, params: UpdateStudiesDto) : Promise<number>;
    delete (id: number) : Promise<number>;
    search (studiesSearch: StudiesSearchDto) : Promise<Array<StudiesDto>>;
}


export class StudiesRepository extends SchemaRepository implements StudiesRepositoryInterface {
    
    constructor() {
        super();
        this.table = 'studies';
    }

    create = async (params: CreateStudiesDto) : Promise<number> => {
        const query = `INSERT INTO ${this.table} SET
            title = ?
        `;

        const values = [
            StudiesEntity.validateTitle(params.studyTitle)
        ];

        try {
            const conn = await DatabaseService.getConnection();
            const result = await conn.execute<ResultSetHeader>(query, values);

            return result.length ? result[0].insertId : 0;
        } catch (err) {
            console.log(err);
            throw new DatabaseError('Error when creating Study!');
        }
    }

    update = async (id: number, params: UpdateStudiesDto) : Promise<number> => {
        let query = `UPDATE ${this.table} SET `;
        const groupedParams = [];
        const values = []

        for (const [key, value] of Object.entries(params)) {
            groupedParams.push(`${key} = ?`);

            // validate input
            switch (key) {
                case 'title':
                    values.push(StudiesEntity.validateTitle(value));
                    break;
                default:
                    values.push(value);
            }
        }

        query += groupedParams.join(', ');
        query += ` WHERE id = ?`;
        values.push(StudiesEntity.validateId(id));

        try {
            const conn = await DatabaseService.getConnection();
            const result = await conn.execute<ResultSetHeader>(query, values);

            return result ? result[0].affectedRows : 0;
        } catch (err) {
            console.log(err);
            throw new DatabaseError(`Error when updating Study ${id}`);
        }
    }

    delete = async (id: number) : Promise<number> => {
        let query = `DELETE FROM ${this.table} WHERE id=?`;
        let params = [ StudiesEntity.validateId(id) ];

        try {
            const conn = await DatabaseService.getConnection();
            const result = await conn.execute<ResultSetHeader>(query, params);

            return result ? result[0].affectedRows : 0;
        } catch (err) {
            console.log(err);
            throw new DatabaseError(`Error when deleting user ${id}!`);
        }
    }

    search = async (studiesSearch: StudiesSearchDto) : Promise<Array<StudiesDto>> => {
        const qb = new QueryBuilder();
        const params: Array<any> = [];
        const results: Array<StudiesDto> = [];
        let query;
        
        qb.setFrom(this.table);

        if (studiesSearch.id) {
            qb.addWhere('id = ?');
            params.push(StudiesEntity.validateId(studiesSearch.id));
        }

        if (studiesSearch.limit) {
            let num = Number(studiesSearch.limit);
            if (!isNaN(num)) {
                qb.setLimit(num);
            } else {
                delete studiesSearch.limit;
            }
        }

        if (studiesSearch.offset) {
            let num = Number(studiesSearch.offset);
            if (!isNaN(num)) {
                qb.setOffset(num);
            } else {
                delete studiesSearch.offset;
            }            
        }

        if (studiesSearch.sort) {
            qb.addSort(studiesSearch.sort);
        }

        query = qb.buildQuery();

        try {
            const conn = await DatabaseService.getConnection();
            const [ rows ] = await conn.execute<RowDataPacket[]>(query, params);

            if (rows) {
                for (let i in rows) {
                    results.push(rows[i] as StudiesDto);
                }
            }
        } catch (err) {
            console.log(err);
            throw new DatabaseError('Error when searching users!');
        }


        return results;
    }

}