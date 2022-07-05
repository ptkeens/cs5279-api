import { StudiesDto, StudiesSearchDto } from "./StudiesDto";
import { SchemaRepository } from "../Framework/schemaRepository";
import { DatabaseError } from '../Database/databaseError';
import { QueryBuilder } from '../Database/queryBuilder';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export interface StudiesRepositoryInterface {
    create () : Promise<void>;
    update () : Promise<void>;
    delete (id: number) : Promise<void>;
    search (studiesSearch: StudiesSearchDto) : Promise<Array<StudiesDto>>;
}


export class StudiesRepository extends SchemaRepository implements StudiesRepositoryInterface {
    
    constructor() {
        super();
        this.table = 'studies';
    }

    create = async () : Promise<void> => {


    }

    update = async () : Promise<void> => {

    }

    delete = async (id: number) : Promise<void> => {

    }

    search = async (studiesSearch: StudiesSearchDto) : Promise<Array<StudiesDto>> => {
        const response : Array<StudiesDto> = [];

        return response;
    }

}