// worker.ts

import { Pool } from "pg";

const poolCloud = new Pool({
  connectionString:
    "postgresql://kondashivaradhan007:TqMtHaiLCZ57@ep-steep-poetry-31551584.us-east-2.aws.neon.tech:5432/rimmindDB?ssl=true",
});

interface cloudWrite {
  ruid: string;
  title: string;
  user: string;
  desp: string;
  TagArray: string[];
}

process.on("message", async (data: cloudWrite) => {
  await EditDatatoCloud(data);
});

async function EditDatatoCloud(data: cloudWrite): Promise<void> {
  const { ruid, title, user, desp, TagArray } = data;
  console.log(
    `come here to update the record into the cloud from user record with ruid - ${ruid}`
  );

  try {
    const result = await poolCloud.query(
      "UPDATE userrecords SET title = $1, description = $2, tags = $3 WHERE ruid = $4",
      [title, desp, TagArray, ruid]
    );

    console.log("Updated into the cloud");
  } catch (error) {
    console.error("Error updating to cloud database:", error);
    process.exit(1); // Exit with an error code
  } finally {
    poolCloud.end(); // Close the connection pool
    process.exit(0); // Exit with success code
  }
}
