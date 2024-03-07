"use strict";
// worker.ts
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
// const poolCloud = new Pool({
//   connectionString:
//     "postgresql://kondashivaradhan007:TqMtHaiLCZ57@ep-steep-poetry-31551584.us-east-2.aws.neon.tech:5432/rimmindDB?ssl=true",
// });
const poolCloud = new pg_1.Pool({
    user: "postgres",
    password: "haElMPY70TOc",
    host: "ep-steep-poetry-31551584.us-east-2.aws.neon.tech",
    port: 5432,
    database: "rimmindDB",
    // ssl: { rejectUnauthorized: false },
    ssl: { rejectUnauthorized: false },
});
process.on("message", (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield EditDatatoCloud(data);
}));
function EditDatatoCloud(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ruid, title, user, desp, TagArray } = data;
        console.log(`come here to update the record into the cloud from user record with ruid - ${ruid}`);
        try {
            const result = yield poolCloud.query("UPDATE userrecords SET title = $1, description = $2, tags = $3 WHERE ruid = $4", [title, desp, TagArray, ruid]);
            console.log("Updated into the cloud");
        }
        catch (error) {
            console.error("Error updating to cloud database:", error);
            process.exit(1); // Exit with an error code
        }
        finally {
            poolCloud.end(); // Close the connection pool
            process.exit(0); // Exit with success code
        }
    });
}
