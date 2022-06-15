import { DatabaseService } from '../Database/databaseService';
import { UserEntity } from './userEntity';
import { UserDto, CreateUserDto, UpdateUserDto, UserSearchDto } from './userDto';
import { DatabaseError } from '../Database/databaseError';
import { QueryBuilder } from '../Database/queryBuilder';
import { RowDataPacket } from 'mysql2/promise';

export class baseUserRepository {

    create = async (userCreate: CreateUserDto) : Promise<boolean> => {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    update = async (id: number, params: UpdateUserDto) : Promise<void> => {

    }

    delete = async (id: number) : Promise<void> => {
    
    }


    search = async (userSearch: UserSearchDto) : Promise<Array<UserDto>> => {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    }

}

export class userRepository extends baseUserRepository {
    
    table: string;

    constructor() {
        super();
        this.table = 'users';
    }

    create = async (userCreate: CreateUserDto) : Promise<boolean> => {
        let query = `INSERT INTO ${this.table} SET
            firstName = ?,
            lastName = ?,
            email = ?,
            password = ?
        `;

        let params = [
            UserEntity.validateFirstName(userCreate.firstName),
            UserEntity.validateLastName(userCreate.lastName),
            UserEntity.validateEmail(userCreate.email),
            UserEntity.hashPassword(userCreate.password)
        ];

        try {
            const conn = await DatabaseService.getConnection();
            const result = await conn.execute(query, params);

            console.log(result);

            if (result) {
                return true;
            }

            return false;
        } catch (err) {
            console.log(err);
            throw new DatabaseError('Error when creating user!');
        }
    }

    update = async (id: number, params: UpdateUserDto) : Promise<void> => {
        let query = `UPDATE ${this.table} SET `;
        const groupedParams = [];
        const values = []

        for (const [key, value] of Object.entries(params)) {
            groupedParams.push(`${key} = ?`);

            // validate input
            switch (key) {
                case 'email':
                    values.push(UserEntity.validateEmail(value));
                    break;
                case 'firstName':
                    values.push(UserEntity.validateFirstName(value));
                    break;
                case 'lastName':
                    values.push(UserEntity.validateLastName(value));
                    break;
                default:
                    values.push(value);
            }
        }

        query += groupedParams.join(', ');
        query += ` WHERE id = ?`;
        values.push(UserEntity.validateId(id));

        try {
            const conn = await DatabaseService.getConnection();
            const response = await conn.query(query, params);
        } catch (err) {
            console.log(err);
            throw new DatabaseError(`Error when updating user ${id}`);
        }
    }

    delete = async (id: number) : Promise<void> => {
        let query = `DELETE FROM ${this.table} WHERE id=?`;
        let params = [ UserEntity.validateId(id) ];

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
            params.push(UserEntity.validateId(userSearch.id));
        }

        if (userSearch.limit) {
            let num = Number(userSearch.limit);
            if (!isNaN(num)) {
                qb.setLimit(num);
            } else {
                delete userSearch.limit;
            }
        }

        if (userSearch.offset) {
            let num = Number(userSearch.offset);
            if (!isNaN(num)) {
                qb.setOffset(num);
            } else {
                delete userSearch.offset;
            }            
        }

        if (userSearch.firstName) {
            qb.addWhere('firstName = ?');
            params.push(UserEntity.validateFirstName(userSearch.firstName));
        }

        if (userSearch.lastName) {
            qb.addWhere('lastName = ?');
            params.push(UserEntity.validateLastName(userSearch.lastName));
        }

        if (userSearch.email) {
            qb.addWhere('email = ?');
            params.push(UserEntity.validateEmail(userSearch.email));
        }

        if (userSearch.sort) {
            qb.addSort(userSearch.sort);
        }

        query = qb.buildQuery();

        try {
            const conn = await DatabaseService.getConnection();
            const [ rows ] = await conn.execute<RowDataPacket[]>(query, params);

            if (rows) {
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