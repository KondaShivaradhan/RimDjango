"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserInCloud = void 0;
const child_process_1 = require("child_process");
// creating user in cloud
function CreateUserInCloud(email) {
    try {
        console.log(`trying to insert a new user into cloud ${email}`);
        // asdfa
        const cloudConnectionString = "postgresql://postgres:haElMPY70TOc@ep-steep-poetry-31551584.us-east-2.aws.neon.tech:5432/rimmindDB?ssl=true";
        const writeCommand = `psql "${cloudConnectionString}" -c "INSERT INTO users (email) VALUES ('${email}');"`;
        const childProcess = (0, child_process_1.exec)(writeCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error writing new user to cloud database: ${error}`);
            }
            else {
                console.log("Write New user to cloud database complete.");
            }
        });
        childProcess.unref();
    }
    catch (error) {
        console.error("Error inserting user into the cloud", error);
    }
}
exports.CreateUserInCloud = CreateUserInCloud;
