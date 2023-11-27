import { Pool } from 'pg';

const pool22 = new Pool({
    user: 'kondashivaradhan007',
    password: 'TqMtHaiLCZ57',
    host: 'ep-steep-poetry-31551584.us-east-2.aws.neon.tech',
    port: 5432,
    database: 'rimmindDB',
    ssl: { rejectUnauthorized: false }, 
});
const pool = new Pool({
    user: 'postgres',
    password: 'new_password',
    host: '192.168.1.10',
    port: 5432,
    database: 'rimmindDB',
    ssl: { rejectUnauthorized: false }, 
});

export default pool;