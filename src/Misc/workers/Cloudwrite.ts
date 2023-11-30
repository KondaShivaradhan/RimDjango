// worker.ts

import { Pool } from "pg";

const poolCloud = new Pool({
  connectionString:
    "postgresql://kondashivaradhan007:TqMtHaiLCZ57@ep-steep-poetry-31551584.us-east-2.aws.neon.tech:5432/rimmindDB?ssl=true",
});

interface cloudWrite {
  id: string;
  title: string;
  user: string;
  desp: string;
  TagArray: string[];
}

process.on("message", async (data: cloudWrite) => {
  await writeDataToCloud(data);
});

async function writeDataToCloud(data: cloudWrite): Promise<void> {
  const { id, title, user, desp, TagArray } = data;
  console.log(
    `come here to insert the record into the cloud from user record with id - ${id}`
  );

  try {
    const userQueryResult = await poolCloud.query(
      'SELECT id FROM "users" WHERE email = $1',
      [user]
    );
    const userId = userQueryResult.rows[0].id;

    const insertQuery = `
            INSERT INTO "userrecords" (user_email_id, title, description, tags, media)
            VALUES ($1, $2, $3, $4, $5)
        `;

    const insertValues = [userId, title, desp, TagArray, null];

    await poolCloud.query(insertQuery, insertValues);

    console.log("Inserted into the cloud");
  } catch (error) {
    console.error("Error writing to cloud database:", error);
    process.exit(1); // Exit with an error code
  } finally {
    poolCloud.end(); // Close the connection pool
    process.exit(0); // Exit with success code
  }
}