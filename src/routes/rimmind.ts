import { Router, Request, Response, NextFunction } from "express";
import pool from "../postdb";
import { CreateUserInCloud, cloudWrite } from "../Misc/Children/CloudWrite";
import { fork } from "child_process";
import axios from "axios";
import fs from "fs";
import { join } from "path";
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "ytmusic-2e8f3",
    private_key_id: "448ed1ac156db4fc761bdc08404bb5d1480126d4",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC/SdYhGpBseX2v\nlYBobJlWTqtwpJReUo3JTJyrfux9LJa5SL1NGlWlwSgXrzxWMOioN/60F7D+sIaY\nWTGNa8KSFoERoS2nX04zbXQk2tNFDcQDA4VdA/bDZGTxgXnaMNnwlIJC4nXDJtS2\n8yE+Kk/9x93TEfpgTeO4RTk2/wfpL+6/ItCNQybMoqRcAlDh3k5dRw8A/HCTuE73\njHvyNYygJy2qdUySVAdXzW7RPe88pnucs/bGRr6BbYUrm/pQO07z8BzQLjyNCVCp\niKh+gTOl1svdqjzWcey+AAp8TyqmIcQeYBvqazjfn+yevNBLkMoGXETLYEnkqSaj\nxC8FebcpAgMBAAECggEAFub5tqvuB7bCCBAvuBDsiOtRVmK2Ctb6d9Pu3A+Ns+zv\nPM7LL1yMTZSjPrax1CX17RILMje17sBm1P2005hHyuLb4Cb6htP/0mNz6Oe0LMvZ\noHy+7mSHmlw+Q7X7R1ba+RVmxShE7jELfb39SGqbeiiAVAGOhxI8Rfcvwvhk05O/\nFGPJd3XX/prMFqRIoy30Vr0wVN84JfHSbVM4sx9h5ofbG8dGBJr34YEF18PZhl1m\n1qaougHXjeyi9TaiajRS1zJ36HLGC+YEEAoxxxW9csXMXvphg0JVeAvvArin38nn\nq3ks4KjmxfPHz84WvKzW18SYQCcctR9p2PDddmd++wKBgQDg1cRI4pRyvokxjWy3\nM005Gi+LmkuwEEScJEbQIUGbI9XSWXe/Nr+l4at3NEDBINZWEAr1el+fompmWHEH\nzSDLCnL+YhghVLBChe3PJZ/VUSO6P+SdcGxyHumn0xnycy75CZTzbTZW1V3dised\nJ0UXlgPSADKda259NyJ96gY6UwKBgQDZzayTeCJ2Pyz8MnTuvTZ64sM87U2/akgt\n+9JJ2GvsuZ0cGV3voZhxbsuDaAOt9oYgwHAPc2T1BQPoQ0SJybLP4YzwZb6WVCjV\n0yQH8b+638awTNnqlKH2U6zz26RsE4EPc/f9vPLdza+kHFy8rzb6mqWsb42AOZq/\nE5JtDpCxEwKBgQCMgYrU8aRLwP8D1JnoM0tDMDYeTCKYuNHnslP+pYnWZiKt/fNz\nr8c85za8nA8LonXP+t6eYgd4P4u2wfaBJZQkzzbl+m+SBNbR+9iN57lnGfn13xAD\nw8pB10e19Zr1hT4JrA9FwS6APX8XgC8W6v+mqb1hc3YuIoE+B0Kq5aFWuQKBgQDT\nqyGbk7YSKuWCF1sypWor1PMe5BSaASUyozfEEnMYdW7tXu2+s9Id8yoPg+eHijzh\n2YNOULv9rykT8UPLkNyZUL8S5h5ppFKnM3Ih0lydtVo3/ggOBPK+HKXJvFy3t+DG\nbtLEont4+atHl1S8/p80v1RhF2xyAAmWxuOX3v7ZRwKBgQCnNYZxhFweHEWnWrQw\nx5M2jRa1gs9SFg1/7ictKeRXukKb6shbBiNRuVUADSMnUN1Xfy9HERO9fhfKwV/a\nBHlWesIXRubCH27qC6w+c69dfIQ9uS5Diezormhw+p/T7BmlmKX7DzdjeQdpEI6b\nOrIJg/VUXEJdY/0FcojAyos15A==\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-ba4ia@ytmusic-2e8f3.iam.gserviceaccount.com",
    client_id: "107967636075263970979",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ba4ia%40ytmusic-2e8f3.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  }),
});
async function decodeGoogleToken(idToken: string) {
  try {
    console.log("Came to Decode this token");
    console.log(idToken);

    const response = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
    );
    return response.data;
  } catch (error) {
    console.error("Error decoding Google token:", error);
    throw new Error("Failed to decode Google token");
  }
}
const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.path === "/getapk" ||
    req.path === "/getver" ||
    req.path === "/setapk" ||
    req.path === "/sync" ||
    req.path === "/setver"
  ) {
    // Skip middleware, move to the next middleware or route handler
    return next();
  }
  try {
    const idToken = req.headers.authorization?.split(" ")[1];
    const platform = req.headers.platform;
    switch (platform) {
      case "Mobile":
        await decodeGoogleToken(idToken ?? "")
          .then((decodedToken) => {
            console.log("Decoded Google token:", decodedToken);
            res.locals.decodedToken = decodedToken;
            next();
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });
        break;
      case "Web":
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        res.locals.decodedToken = decodedToken;
        next();
        break;

      default:
        console.error(" verification failed:");
        res.status(401).json({ error: "Unauthorized" });
        break;
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};
const router = Router();
router.use(authenticateToken);
// get All records
router.get("/", async (req: Request, res: Response) => {
  const decodedToken = res.locals.decodedToken;

  const email = decodedToken.email;
  if (!email) {
    return res.status(400).json({ error: "Email parameter is missing" });
  }
  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const userRecords = await pool.query(
      "SELECT * FROM userrecords WHERE userID = $1",
      [existingUser.rows[0].id]
    );
    console.log(`Send all records for ${email}`);
    console.log(userRecords.rows.length);

    return res.status(200).send(userRecords.rows);
  } catch (error) {
    console.log(error);
  }
  res.json({ message: `Received email: ${email}` });
});
// create user
router.post("/", async (req: Request, res: Response) => {
  console.log("came to login");
  const decodedToken = res.locals.decodedToken;

  const email = decodedToken.email;
  try {
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
/**
 * This route is for inserting a new record
 * Takes users data and saves it in local and cloud storage
 *
 */
router.post("/add", async (req: Request, res: Response) => {
  console.log(`come here to insert the record into local datase`);
  const { title, user, desp, TagArray, media } = req.body;
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
          INSERT INTO "userrecords" (userID, title, description, tags, media,ruid)
          VALUES ($1, $2, $3, $4, $5,$6)
        `;

    const insertValues = [userId, title, desp, TagArray, media, uniqueId]; // Assuming media is not included in this example

    await pool.query(insertQuery, insertValues);

    await pool.query("COMMIT");
    console.log("inserted into local");
    res.json({ message: "Data added successfully" });
    const data: cloudWrite = {
      title: title,
      userid: userId,
      desp: desp,
      TagArray: TagArray,
      ruid: uniqueId,
      media: media,
    };
    // time to backup data
    const childProcess = fork("../dist/Misc/workers/Cloudwrite.js");
    childProcess.send(data);
    childProcess.disconnect();
    childProcess.unref();
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
      // time to backup data
      const childProcess = fork("../dist/Misc/workers/CloudDelete.js");
      childProcess.send(data);
      childProcess.disconnect();
      childProcess.unref();
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
    const { title, desp, TagArray, media } = req.body;
    const result = await pool.query(
      "UPDATE userrecords SET title = $1, description = $2, tags = $3,media=$4 WHERE ruid = $5",
      [title, desp, TagArray, media, ruid]
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
// sync database
router.get("/sync", (req: Request, res: Response) => {
  // main.ts
  const childProcess = fork("../dist/Misc/Sync/CloudSync.js");

  // Detach the child process so it can run independently
  childProcess.disconnect();
  childProcess.unref();
  res.send("Sync Completed");
});
router.get("/setver", async (req: Request, res: Response) => {
  const ver = req.query.ver as string;
  console.log("====================================");
  console.log(ver);
  console.log("====================================");
  const selectQuery = `
      Select * from Misc;
    `;
  const result2 = await pool.query(selectQuery);
  if (result2.rowCount != null && result2.rowCount > 0) {
    console.log("updating new version");

    const insertQuery = `
          UPDATE misc SET version=$1 WHERE ctid = (SELECT ctid FROM misc LIMIT 1);
        `;
    const result = await pool.query(insertQuery, [ver]);
    console.log(result.rows);
  } else {
    console.log("Inserting new version");

    const insertQuery = `
          INSERT INTO Misc (version)
      VALUES ($1);
        `;
    const result = await pool.query(insertQuery, [ver]);
    console.log(result.rows);
  }
  res.send(`Came to change the version to ${ver}`);
});
// application version
router.get("/getver", async (req: Request, res: Response) => {
  const ver = req.query.ver as string;

  const selectQuery = `
      Select * from Misc;
    `;
  const result2 = await pool.query(selectQuery);
  console.log(result2.rows);
  console.log(
    `Came to check the Appversion - ${ver} with latest version ${result2.rows[0].version}`
  );
  res.send({ status: result2.rows[0].version === ver });
});
/**
 * To download the apt file and save it from the expo build storage
 * Fetches Appversion
 */

router.get("/setapk", async (req: Request, res: Response) => {
  const url = req.query.url as string;
  console.log("====================================");
  console.log(url);
  console.log("====================================");
  try {
    // Download the APK file
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const apkData = response.data;

    // Save the APK file to a local path with the version-appended name
    const localFilePath = join(__dirname, `rimmind.apk`);
    fs.writeFileSync(localFilePath, Buffer.from(apkData));

    res
      .status(200)
      .send("downloaded the APk file and saved it here -> " + localFilePath);
  } catch (error) {
    console.error("Error downloading APK:", error);
    res.status(500).send("Error downloading APK");
  }
});

router.get("/getapk", async (req: Request, res: Response) => {
  console.log(`Came to send the APK URL`);
  const selectQuery = `
      Select * from Misc;
    `;
  const result2 = await pool.query(selectQuery);
  console.log("====================================");
  console.log(result2);
  console.log("====================================");
  const localFilePath = join(__dirname, `rimmind.apk`);
  console.log(localFilePath);

  res.sendFile(localFilePath, {
    headers: {
      "Content-Type": "application/vnd.android.package-archive",
      "Content-Disposition": `attachment; filename=rimmind.apk`,
    },
  });
});
router.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Wrong URL");
});

export default router;
