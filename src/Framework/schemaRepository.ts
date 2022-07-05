import { BaseRepository } from "./baseRepository";

export class SchemaRepository extends BaseRepository {

    table: string;

    constructor() {
        super();
        this.table = '';
    }
}