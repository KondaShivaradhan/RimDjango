import { exec } from 'child_process';
import  pgPromise from 'pg-promise';
import * as dotenv from 'dotenv';

dotenv.config();

const pgp = pgPromise();
const localDb = pgp({
  user: process.env.LOCAL_DB_USERNAME,
  host: process.env.LOCAL_DB_HOST,
  database: process.env.LOCAL_DB_NAME,
  password: process.env.LOCAL_DB_PASSWORD,
  port: 5432,
});

