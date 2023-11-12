import { Pool } from 'pg';

const pool = new Pool({
    user: 'kondashivaradhan007',
    password: 'TqMtHaiLCZ57',
    host: 'ep-steep-poetry-31551584.us-east-2.aws.neon.tech',
    port: 5432,
    database: 'rimmindDB',
    ssl: { rejectUnauthorized: false }, 
});

export default pool;