import { exec } from "child_process";
import { poolCloud } from "../../postdb";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export interface cloudWrite {
  title: string;
  userid: string;
  desp: string;
  ruid: UUID;
  TagArray: string;
}
// haElMPY70TOc
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
// editing record in cloud
export function EditRecordInCloud(data: cloudWrite): void {
  const { ruid, title, desp, TagArray } = data;
  console.log(
    `come here to Edit the record into cloud from userrecord with ruid - ${ruid}`
  );

  const cloudConnectionString =
    "postgresql://postgres:haElMPY70TOc@ep-steep-poetry-31551584.us-east-2.aws.neon.tech:5432/rimmindDB?ssl=true";

  const writeCommand = `psql "${cloudConnectionString}" -c "UPDATE userrecords SET title = '${title}', description = '${desp}', tags = '{${TagArray}}' WHERE ruid = '${ruid}';"`;

  const childProcess = exec(writeCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error editing a record in cloud database ${error}`);
    } else {
      console.log("Editing record in cloud is complete.");
    }
  });

  childProcess.unref();
}
// inserting a record in cloud
export function writeDataToCloud(data: cloudWrite): void {
  const { ruid, title, userid, desp, TagArray } = data;
  console.log(
    `come here to insert the record into cloud from userrecord with ruid - ${ruid}`
  );

  const cloudConnectionString =
    "postgresql://postgres:haElMPY70TOc@ep-steep-poetry-31551584.us-east-2.aws.neon.tech:5432/rimmindDB?ssl=true";

  const writeCommand = `psql "${cloudConnectionString}" -c "INSERT INTO userrecords (user_email_id, title, description, tags, media,ruid)
     VALUES ('${data.userid}','${data.title}','${data.desp}','{${data.TagArray}}',null.'${ruid}');"`;

  const childProcess = exec(writeCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error writing to cloud database: ${error}`);
    } else {
      console.log("Write to cloud database complete.");
    }
  });

  childProcess.unref();
}

//deleting a record in cloud
export function deleteinCloud(data: { ruid: string }): void {
  const { ruid } = data;
  console.log(
    `come here to delete the record into cloud from userrecord with ruid - ${ruid}`
  );

  const cloudConnectionString =
    "postgresql://postgres:haElMPY70TOc@ep-steep-poetry-31551584.us-east-2.aws.neon.tech:5432/rimmindDB?ssl=true";

  const writeCommand = `psql "${cloudConnectionString}" -c "DELETE FROM userrecords WHERE ruid = '${ruid}';"`;

  const childProcess = exec(writeCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error deleting a record in database: ${error}`);
    } else {
      console.log("deleting a record in cloud database complete.");
    }
  });

  childProcess.unref();
}
