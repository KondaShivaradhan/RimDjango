import { Pool } from "pg";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export const poolCloud = new Pool({
  user: "postgres",
  password: "haElMPY70TOc",
  host: "ep-steep-poetry-31551584.us-east-2.aws.neon.tech",
  port: 5432,
  database: "rimmindDB",
  // ssl: { rejectUnauthorized: false },
  ssl: { rejectUnauthorized: false },
});
const pool = new Pool({
  user: "postgres",
  password: "new_password",
  host: "127.0.0.1",
  port: 5432,
  database: "rimmindDB",
  // haElMPY70TOc
  //   TqMtHaiLCZ57
  // ssl: { rejectUnauthorized: false },
  ssl: false,
});

export default pool;
export interface userEntity {
  id: string;
  email: string;
}
export interface recordEntity {
  user_email_id: number;
  title: string;
  description: string;
  tags: string[];
  ruid: UUID;
}
