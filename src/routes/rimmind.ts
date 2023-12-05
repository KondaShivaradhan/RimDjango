import { Router, Request, Response, NextFunction } from "express";
import pool from "../postdb";
import { CheckID, validate } from "../Misc/CommonFunctions";
import { log } from "console";
import {
  CreateUserInCloud,
  EditRecordInCloud,
  cloudWrite,
  deleteinCloud,
  writeDataToCloud,
} from "../Misc/Children/CloudWrite";
import { fork, spawn } from "child_process";
var no_of_writes = 0;
const router = Router();
// get All records
router.get("/", async (req: Request, res: Response) => {
  const email = req.query.email as string;

  if (!email) {
    return res.status(400).json({ error: "Email parameter is missing" });
  }
  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    console.log(existingUser.rows[0].id);
    console.log("fethicng this uers data");

    const userRecords = await pool.query(
      "SELECT * FROM userrecords WHERE user_email_id = $1",
      [existingUser.rows[0].id]
    );
    console.log(`Send all records for ${email}`);

    return res.status(200).send(userRecords.rows);
  } catch (error) {}
  res.json({ message: `Received email: ${email}` });
});
// create user
router.post("/", async (req: Request, res: Response) => {
  console.log("came to login");

  try {
    const { email } = req.body;
    console.log(`email recevied from app is ${email}`);

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(200).send("exists");
    }

    const result = await pool.query("INSERT INTO users (email) VALUES ($1)", [
      email,
    ]);

    res.status(200).send("new");

    CreateUserInCloud(email);
    return null;
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Internal Server Error");
  }
});
// Upload
router.post("/add", async (req: Request, res: Response) => {
  console.log(`come here to insert the record into local datase`);
  const { title, user, desp, TagArray } = req.body;
  try {
    await pool.query("BEGIN");
    // Assuming "User" table has 'id' as primary key
    const userQueryResult = await pool.query(
      'SELECT id FROM "users" WHERE email = $1',
      [user]
    );

    if (userQueryResult.rows.length === 0) {
      // User not found, you may want to handle this case
      return res.status(404).json({ message: "User not found" });
    }
    // get uuid for this record
    const { v4: uuidv4 } = require("uuid");

    // Generate a UUID
    const uniqueId = uuidv4();

    console.log(uniqueId);

    const userId = userQueryResult.rows[0].id;

    // Inserting data into "UserRecords" table
    const insertQuery = `
          INSERT INTO "userrecords" (user_email_id, title, description, tags, media,ruid)
          VALUES ($1, $2, $3, $4, $5,$6)
        `;

    const insertValues = [userId, title, desp, TagArray, null, uniqueId]; // Assuming media is not included in this example

    await pool.query(insertQuery, insertValues);

    await pool.query("COMMIT");
    console.log("inserted into local");
    res.json({ message: "Data added successfully" });
    const data: cloudWrite = {
      title: title,
      userid: user,
      desp: desp,
      TagArray: TagArray,
      ruid: uniqueId,
    };
    // time to backup data!
    // main.ts
    const childProcess = fork("../dist/Misc/workers/Cloudwrite.js");

    // Send data to the child process
    childProcess.send(data);

    // Detach the child process so it can run independently
    childProcess.disconnect();
    childProcess.unref();
    // writeDataToCloud(data);

    return null;
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
});
// Delete Record
router.delete("/", async (req: Request, res: Response) => {
  const ruid = req.query.ruid as string;
  console.log(`Came to delete the record with ruid - ${ruid}`);
  const { title, user, desp, TagArray } = req.body;
  try {
    // Delete the row from the 'userrecords' table based on the provided 'ruid'
    const deleteResult = await pool.query(
      "DELETE FROM userrecords WHERE ruid = $1",
      [ruid]
    );

    // Check if any row was deleted
    if (deleteResult.rowCount && deleteResult.rowCount > 0) {
      res.status(200).json({ message: "Record deleted successfully" });
      const data = {
        ruid: ruid,
      };
      deleteinCloud(data);
      return null;
    } else {
      return res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    console.error("Error deleting record:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
// edit record

router.put("/", async (req: Request, res: Response) => {
  console.log("came to update record");
  const ruid = req.query.ruid as string;
  try {
    const { title, desp, TagArray } = req.body;
    const result = await pool.query(
      "UPDATE userrecords SET title = $1, description = $2, tags = $3 WHERE ruid = $4",
      [title, desp, TagArray, ruid]
    );

    if (result.rowCount && result.rowCount > 0) {
      // If rowCount is greater than 0, the update was successful

      res.status(200).send("updated");

      const data = {
        ruid: ruid,
        title: title,
        desp: desp,
        TagArray: TagArray,
        user: "",
      };
      // main.ts
      const childProcess = fork("../dist/Misc/workers/CloudUpdate.js");

      // Send data to the child process
      childProcess.send(data);

      // Detach the child process so it can run independently
      childProcess.disconnect();
      childProcess.unref();
      //   EditRecordInCloud(data);
    } else {
      // If rowCount is 0, no record was updated (user with the given ID not found)
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating user record:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Wrong URL");
});
export default router;
