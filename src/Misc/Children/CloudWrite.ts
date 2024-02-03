import { exec } from "child_process";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
// using this file to create a childprocess to write in cloud, creating a new user and the interface
export interface cloudWrite {
  title: string;
  userid: string;
  desp: string;
  ruid: UUID;
  media: any[];
  TagArray: string;
}
// creating user in cloud
export function CreateUserInCloud(email: string): void {
  try {
    console.log(`trying to insert a new user into cloud ${email}`);

    // asdfa
    const cloudConnectionString =
      "postgresql://postgres:haElMPY70TOc@ep-steep-poetry-31551584.us-east-2.aws.neon.tech:5432/rimmindDB?ssl=true";

    const writeCommand = `psql "${cloudConnectionString}" -c "INSERT INTO users (email) VALUES ('${email}');"`;

    const childProcess = exec(writeCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error writing new user to cloud database: ${error}`);
      } else {
        console.log("Write New user to cloud database complete.");
      }
    });

    childProcess.unref();
  } catch (error) {
    console.error("Error inserting user into the cloud", error);
  }
}
