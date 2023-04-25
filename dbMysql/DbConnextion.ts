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
    values = toLine(values);
    return new Promise((resolve, reject) => {
        const _query = dbConnection.query(query, values, ((err, results) => {
            if (err) reject(err);
            resolve(results);
        }))
        console.log('sql', _query.sql)
    })
}

const toLine = (data: any) => {
    if (data === undefined) return data;
    if (typeof data !== 'object' || Array.isArray(data)) return data;
    const params = {} as any;
    Object.keys(data).forEach(key => {
        const _key = key.replace(/([A-Z])/g, "_$1").toLowerCase();
        params[_key] = data[key];
    });
    return params;
}

function camelize(str) {
    return str.replace(/[-_]+(\w)/g, function(match, firstChar) {
        return firstChar.toUpperCase();
    });
}

function camelizeKeys(obj) {
    if (Array.isArray(obj)) {
        return obj.map(camelizeKeys);
    } else if (obj !== null && typeof obj === "object") {
        return Object.keys(obj).reduce(function(acc, key) {
            var camelKey = camelize(key);
            acc[camelKey] = camelizeKeys(obj[key]);
            return acc;
        }, {});
    } else {
        return obj;
    }
}

export default dbConnection;
