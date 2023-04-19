import { createConnection, Connection, QueryOptions } from 'mysql';

interface DbConnection extends Connection {
    queryPromise(query: string | QueryOptions, values?: any): Promise<any>
}

const dbConnection: DbConnection = createConnection({
    host: 'localhost',
    port: 3306,
    user: 'test',
    password: 'password',
    database: 'test'
}) as DbConnection

dbConnection.queryPromise = (query: string | QueryOptions, values?: any) => {
    return new Promise((resolve, reject) => {
        dbConnection.query(query, values, ((err, results) => {
            if (err) reject(err);
            resolve(results);
        }))
    })
}

export default dbConnection;
