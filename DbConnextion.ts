import { createConnection } from 'mysql';

const dbConnection = createConnection({
    host: 'localhost',
    port: 3306,
    user: 'wsj',
    password: '123456',
    database: 'db-test'
})

export default dbConnection;