import { UserTokenDto, CreateUserTokenDto, UpdateUserTokenDto, UserTokenSearchDto } from './userTokenDto';
import { DatabaseService } from '../Database/databaseService';
import { QueryBuilder } from '../Database/queryBuilder';
import { DatabaseError } from '../Database/databaseError';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { UserTokenEntity } from './userTokenEntity';

export class BaseUserTokenRepository {

    create = async (userCreate: CreateUserTokenDto) : Promise<number> => {
        return new Promise((resolve, reject) => {
            resolve(1);
        });
    }

    update = async (token: string, params: UpdateUserTokenDto) : Promise<number> => {
        return new Promise((resolve, reject) => {
            resolve(1);
        });
    }

    delete = async (token: string) : Promise<number> => {
        return new Promise((resolve, reject) => {
            resolve(1);
        });
    }


    search = async (tokenSearch: UserTokenSearchDto) : Promise<Array<UserTokenDto>> => {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    }
}


export class UserTokenRepository extends BaseUserTokenRepository {

    table: string;

    constructor() {
        super();
        this.table = 'userTokens';
    }

    create = async (userTokenCreate: CreateUserTokenDto) : Promise<number> => {
        let query = `INSERT INTO ${this.table} SET
            token = ?,
            userId = ?,
            remoteAddress = ?
            expires = ?,
        ON DUPLICATE KEY UPDATE
            expires = VALUES(expires),
            remoteAddress = VALUES(remoteAddress)
        `;

        let params = [
            UserTokenEntity.validateToken(userTokenCreate.token),
            UserTokenEntity.validateUserId(userTokenCreate.userId),
            UserTokenEntity.validateRemoteAddress(userTokenCreate.remoteAddress),
            UserTokenEntity.validateExpires(userTokenCreate.expires)
        ];

        try {
            const conn = await DatabaseService.getConnection();
            const result = await conn.execute<ResultSetHeader>(query, params);

            return result.length ? result[0].insertId : 0;
        } catch (err) {
            console.log(err);
            throw new DatabaseError('Error when creating user token!');
        }
    }

    update = async (token: string, params: UpdateUserTokenDto) : Promise<number> => {
        let query = `UPDATE ${this.table} SET `;
        const groupedParams = [];
        const updateParams = [];
        const values = []

        for (const [key, value] of Object.entries(params)) {
            groupedParams.push(`${key} = ?`);

            // validate input
            switch (key) {
                case 'token':
                    values.push(UserTokenEntity.validateToken(value));
                    break;
                case 'userId':
                    values.push(UserTokenEntity.validateUserId(value));
                    updateParams.push('userId = VALUES(userId)');
                    break;
                case 'remoteAddress':
                    values.push(UserTokenEntity.validateRemoteAddress(value));
                    updateParams.push('remoteAddress = VALUES(remoteAddress)');
                    break;
                case 'expires':
                    values.push(UserTokenEntity.validateExpires(value));
                    updateParams.push('expires = VALUES(expires)');
                default:
                    values.push(value);
            }
        }

        query += groupedParams.join(', ');
        query += ` WHERE 
            token = ?
        ON DUPLICATE KEY UPDATE ` + updateParams.join(', ');
        values.push(UserTokenEntity.validateToken(token));

        try {
            const conn = await DatabaseService.getConnection();
            const result = await conn.execute<ResultSetHeader>(query, params);

            return result ? result[0].affectedRows : 0;
        } catch (err) {
            console.log(err);
            throw new DatabaseError(`Error when updating token ${token}`);
        }
    }

    delete = async (token: string) : Promise<number> => {
        const query = `DELETE from ${this.table} WHERE token = `;
        const params = [ token ];

        try {
            const conn = await DatabaseService.getConnection();
            const result = await conn.execute<ResultSetHeader>(query, params);

            return result ? result[0].affectedRows : 0;
        } catch (err) {
            console.log(err);
            throw new DatabaseError(`Error when removing token ${token}`);
        }
    }

    search = async (tokenSearch: UserTokenSearchDto) : Promise<Array<UserTokenDto>> => {

        const qb = new QueryBuilder();
        const params: Array<any> = [];
        const results: Array<UserTokenDto> = [];
        let query;
        
        qb.setFrom(this.table);

        if (tokenSearch.token) {
            qb.addWhere('token = ?');
            params.push(UserTokenEntity.validateToken(tokenSearch.token));
        }

        if (tokenSearch.userId) {
            qb.addWhere('userId = ?');
            params.push(UserTokenEntity.validateUserId(tokenSearch.userId));
        }

        if (tokenSearch.expires) {
            qb.addWhere('expires = ?');
            params.push(UserTokenEntity.validateExpires(tokenSearch.expires));
        }

        if (tokenSearch.expiresGt) {
            qb.addWhere('expires > ?');
            params.push(UserTokenEntity.validateExpires(tokenSearch.expiresGt));
        }

        if (tokenSearch.expiresLt) {
            qb.addWhere('expires < ?');
            params.push(UserTokenEntity.validateExpires(tokenSearch.expiresLt));
        }

        if (tokenSearch.limit) {
            let num = Number(tokenSearch.limit);
            if (!isNaN(num)) {
                qb.setLimit(num);
            } else {
                delete tokenSearch.limit;
            }
        }

        if (tokenSearch.offset) {
            let num = Number(tokenSearch.offset);
            if (!isNaN(num)) {
                qb.setOffset(num);
            } else {
                delete tokenSearch.offset;
            }            
        }

        if (tokenSearch.sort) {
            qb.addSort(tokenSearch.sort);
        }

        query = qb.buildQuery();

        try {
            const conn = await DatabaseService.getConnection();
            const [ rows ] = await conn.execute<RowDataPacket[]>(query, params);

            if (rows) {
                for (let i in rows) {
                    results.push(rows[i] as UserTokenDto);
                }
            }
        } catch (err) {
            console.log(err);
            throw new DatabaseError('Error when searching user tokens!');
        }

        return results;
    }

}