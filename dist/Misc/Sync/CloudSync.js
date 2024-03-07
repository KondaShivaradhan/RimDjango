"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const child_process_1 = require("child_process");
// Replace the connection string with your actual connection string
const connectionString = "postgresql://postgres:haElMPY70TOc@ep-steep-poetry-31551584.us-east-2.aws.neon.tech:5432/rimmindDB?ssl=true";
const poolCloud = new pg_1.Pool({
    connectionString: connectionString,
});
function deleteTables() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield poolCloud.connect();
        try {
            // Execute SQL queries to drop tables
            yield client.query("DROP TABLE IF EXISTS userrecords;");
            yield client.query("DROP TABLE IF EXISTS users;");
            console.log("Tables deleted successfully");
        }
        catch (err) {
            console.error("Error deleting tables:", err);
        }
        finally {
            // Release the client back to the pool
            client.release();
        }
    });
}
function performBackup() {
    return __awaiter(this, void 0, void 0, function* () {
        const pgDumpCommand = "PGPASSWORD=new_password pg_dump -U postgres -h 192.168.1.3 -p 5432 -d rimmindDB > local_dump.sql";
        return new Promise((resolve) => {
            (0, child_process_1.exec)(pgDumpCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing pg_dump: ${error.message}`);
                }
                else if (stderr) {
                    console.error(`pg_dump stderr: ${stderr}`);
                }
                else {
                    console.log("pg_dump completed successfully");
                }
                resolve();
            });
        });
    });
}
// "PGPASSWORD=haElMPY70TOc pg_dump -U postgres -h ep-steep-poetry-31551584.us-east-2.aws.neon.tech -p 5432 -d rimmindDB > local_dump.sql";
// "PGPASSWORD=new_password psql -U postgres -h 127.0.0.1 -p 5432 -d rimmindDB -f local_dump.sql";
// "PGPASSWORD=new_password psql -U postgres -h 192.168.1.3 -p 5432 -d rimmindDB -f local_new.sql";
function performRestore() {
    return __awaiter(this, void 0, void 0, function* () {
        const psqlRestoreCommand = "PGPASSWORD=haElMPY70TOc psql -U postgres -h ep-steep-poetry-31551584.us-east-2.aws.neon.tech -p 5432 -d rimmindDB -f local_dump.sql";
        return new Promise((resolve) => {
            (0, child_process_1.exec)(psqlRestoreCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing psql restore: ${error.message}`);
                }
                else if (stderr) {
                    console.error(`psql restore stderr: ${stderr}`);
                }
                else {
                    console.log("psql restore completed successfully");
                }
                resolve();
            });
        });
    });
}
function runTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        // Execute tasks in sequence
        yield deleteTables().then(() => __awaiter(this, void 0, void 0, function* () {
            yield performBackup().then(() => __awaiter(this, void 0, void 0, function* () {
                yield performRestore();
            }));
        }));
    });
}
// Call the function to run all tasks
runTasks();
