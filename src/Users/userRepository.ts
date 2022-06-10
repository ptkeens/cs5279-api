import { DatabaseService } from '../Database/databaseService';
import { UserDto, CreateUserDto, UpdateUserDto, UserSearchDto } from './userDto';
import { DatabaseError } from '../Database/databaseError';
import { QueryBuilder } from '../Database/queryBuilder';
import { RowDataPacket } from 'mysql2/promise';

export class baseUserRepository {


}

export class userRepository extends baseUserRepository {
    
    table: string;

    constructor() {
        super();
        this.table = 'users';
    }

    create = async (userCreate: CreateUserDto) => {
        let query = `INSERT INTO ${this.table} SET
            firstName = ?,
            lastName = ?,
            email = ?,
            password = ?
        `;

        let params = [
            userCreate.firstName,
            userCreate.lastName,
            userCreate.email,
            userCreate.password
        ];

        try {
            const conn = await DatabaseService.getConnection();
            const result = await conn.execute(query, params);

            if (result) {
                return true;
            }

            return false;
        } catch (err) {
            console.log(err);
            throw new DatabaseError('Error when creating user!');
        }
    }

    update = async (id: number, params: UpdateUserDto) => {

    }

    delete = async (id: number) => {
        let query = `DELETE FROM ${this.table} WHERE id=?`;
        let params = [ id ];

        try {
            const conn = await DatabaseService.getConnection();
            const response = await conn.query(query, params);
        } catch (err) {
            console.log(err);
            throw new DatabaseError(`Error when deleting user ${id}!`);
        }
    }

    search = async (userSearch: UserSearchDto) : Promise<Array<UserDto>> => {
        const qb = new QueryBuilder();
        const params: Array<any> = [];
        const results: Array<UserDto> = [];
        let query;
        
        qb.setFrom(this.table);

        if (userSearch.id) {
            qb.addWhere('id = ?');
            params.push(userSearch.id);
        }

        if (userSearch.firstName) {
            qb.addWhere('firstName = ?');
            params.push(userSearch.firstName);
        }

        if (userSearch.lastName) {
            qb.addWhere('lastName = ?');
            params.push(userSearch.lastName);
        }

        if (userSearch.email) {
            qb.addWhere('email = ?');
            params.push(userSearch.email);
        }

        if (userSearch.sort) {
            qb.addSort(userSearch.sort);
        }

        if (userSearch.limit) {
            qb.setLimit(userSearch.limit);
        }

        if (userSearch.offset) {
            qb.setOffset(userSearch.offset);
        }

        query = qb.buildQuery();

        try {
            const conn = await DatabaseService.getConnection();
            const [ rows ] = await conn.execute<RowDataPacket[]>(query, params);

            if (rows) {
                console.log(rows);
                for (let i in rows) {
                    results.push(rows[i] as UserDto);
                }
            }
        } catch (err) {
            console.log(err);
            throw new DatabaseError('Error when searching users!');
        }


        return results;
    }

}