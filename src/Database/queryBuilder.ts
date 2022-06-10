export class QueryBuilder {

    selectStatements: Array<string>;
    joinStatements: Array<{
        joinType: JoinTypes,
        sql: string
    }>;
    fromStatement: string;
    whereClauses: Array<string>;
    sortClauses: Array<string>;
    limit: number;
    offset: number;

    constructor () { 
        this.selectStatements = [];
        this.fromStatement = '';
        this.joinStatements = [];
        this.whereClauses = [];
        this.sortClauses = [];
        this.limit = 0;
        this.offset = 0;
    }

    addSelect = (column: string) => {
        this.selectStatements.push(column);
        return this;
    }

    addJoin = (join: string, joinType: JoinTypes = JoinTypes.JOIN_TYPE_INNER) => {
        this.joinStatements.push({
            joinType,
            sql: join
        });
        return this;
    }

    setFrom = (from: string) => {
        this.fromStatement = from;
        return this;
    }

    addWhere = (where: string) => {
        this.whereClauses.push(where);
        return this;
    }

    addSort = (sort: string) => {
        this.sortClauses.push(sort);
        return this;
    }

    setLimit(limit: number) {
        this.limit = limit;
        return this;
    }

    setOffset(offset: number) {
        this.offset = offset;
        return this;
    }

    buildQuery = () => {
        let query = 'SELECT ';

        if (this.selectStatements.length) {
            query += this.selectStatements.join(',');
        } else {
            query += ' * ';
        }

        if (this.fromStatement) {
            query += ' FROM ' + this.fromStatement;
        }

        if (this.joinStatements.length) {
            let preparedJoins: Array<string> = [];
            for (let i in this.joinStatements) {
                let joinSql = '';
                switch (this.joinStatements[i].joinType) {
                    default:
                    case JoinTypes.JOIN_TYPE_INNER:
                        joinSql = 'INNER JOIN ';
                        break;
                    case JoinTypes.JOIN_TYPE_OUTER:
                        joinSql = 'OUTER JOIN ';
                        break;
                    case JoinTypes.JOIN_TYPE_LEFT:
                        joinSql = 'LEFT JOIN ';
                        break;
                    case JoinTypes.JOIN_TYPE_RIGHT:
                        joinSql = 'RIGHT JOIN ';
                        break;
                    case JoinTypes.JOIN_TYPE_CROSS:
                        joinSql = 'CROSS JOIN ';
                        break;
                }

                preparedJoins.push(joinSql + this.joinStatements[i].sql);
            }
            query += ' ' + preparedJoins.join(' ');
        }

        if (this.whereClauses.length) {
            query += ' WHERE ';
            query += this.whereClauses.join(' AND ');
        }

        if (this.sortClauses.length) {
            query += ' ORDER BY ' + this.sortClauses.join(',');
        }

        if (this.limit) {
            query += ' LIMIT ' + this.limit;
            
            if (this.offset) {
                query += ' OFFSET ' + this.offset;
            }
        }

        return query;
    }
}

export enum JoinTypes {
    JOIN_TYPE_INNER,
    JOIN_TYPE_OUTER,
    JOIN_TYPE_LEFT,
    JOIN_TYPE_RIGHT,
    JOIN_TYPE_CROSS
}