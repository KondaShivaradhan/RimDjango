"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poolCloud = void 0;
const pg_1 = require("pg");
exports.poolCloud = new pg_1.Pool({
    user: "postgres",
    password: "haElMPY70TOc",
    host: "ep-steep-poetry-31551584.us-east-2.aws.neon.tech",
    port: 5432,
    database: "rimmindDB",
    // ssl: { rejectUnauthorized: false },
    ssl: { rejectUnauthorized: false },
});
const pool = new pg_1.Pool({
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
exports.default = pool;
