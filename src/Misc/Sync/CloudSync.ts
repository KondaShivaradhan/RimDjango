import { Pool } from "pg";
import { exec } from "child_process";

// Replace the connection string with your actual connection string
const connectionString =
  "postgresql://postgres:haElMPY70TOc@ep-steep-poetry-31551584.us-east-2.aws.neon.tech:5432/rimmindDB?ssl=true";

const poolCloud = new Pool({
  connectionString: connectionString,
});

async function deleteTables() {
  const client = await poolCloud.connect();

  try {
    // Execute SQL queries to drop tables
    await client.query("DROP TABLE IF EXISTS userrecords;");
    await client.query("DROP TABLE IF EXISTS users;");

    console.log("Tables deleted successfully");
  } catch (err) {
    console.error("Error deleting tables:", err);
  } finally {
    // Release the client back to the pool
    client.release();
  }
}

async function performBackup() {
  const pgDumpCommand =
    "PGPASSWORD=new_password pg_dump -U postgres -h 127.0.0.1 -p 5432 -d rimmindDB > local_dump.sql";

  return new Promise<void>((resolve) => {
    exec(pgDumpCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing pg_dump: ${error.message}`);
      } else if (stderr) {
        console.error(`pg_dump stderr: ${stderr}`);
      } else {
        console.log("pg_dump completed successfully");
      }
      resolve();
    });
  });
}
// "PGPASSWORD=haElMPY70TOc pg_dump -U postgres -h ep-steep-poetry-31551584.us-east-2.aws.neon.tech -p 5432 -d rimmindDB > local_dump.sql";
// "PGPASSWORD=new_password psql -U postgres -h 127.0.0.1 -p 5432 -d rimmindDB -f local_dump.sql";
// "PGPASSWORD=new_password psql -U postgres -h 192.168.1.3 -p 5432 -d rimmindDB -f local_new.sql";

async function performRestore() {
  const psqlRestoreCommand =
    "PGPASSWORD=haElMPY70TOc psql -U postgres -h ep-steep-poetry-31551584.us-east-2.aws.neon.tech -p 5432 -d rimmindDB -f local_dump.sql";

  return new Promise<void>((resolve) => {
    exec(psqlRestoreCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing psql restore: ${error.message}`);
      } else if (stderr) {
        console.error(`psql restore stderr: ${stderr}`);
      } else {
        console.log("psql restore completed successfully");
      }
      resolve();
    });
  });
}

async function runTasks() {
  // Execute tasks in sequence
  await deleteTables().then(async () => {
    await performBackup().then(async () => {
      await performRestore();
    });
  });
}

// Call the function to run all tasks
runTasks();
