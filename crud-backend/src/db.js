// the database connections, error handling and passing of sensative data

import pg from 'pg';
import env from 'dotenv'

env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})

db.connect();
db.on('error', (err) => {
    console.error('error on client side', err);
    process.exit(-1);
})

export const query = (text, params) => {
    return db.query(text, params);
}