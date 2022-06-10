import mysql from 'mysql2/promise';
import { Connection } from 'mysql2/promise';

export class DatabaseService {

    static conn: Connection;

    public static getConnection = async (): Promise<Connection> => {

        if (!DatabaseService.conn) {
            console.log('Initializing db connection...');
            try {
                DatabaseService.conn = await mysql.createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_SCHEMA
                });
            } catch (err) {
                console.log(err);
                throw err;
            }
        }

        return DatabaseService.conn;
    }

}