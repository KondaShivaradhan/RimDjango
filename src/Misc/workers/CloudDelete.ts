import { Pool } from "pg";

const poolCloud = new Pool({
  user: "postgres",
  password: "haElMPY70TOc",
  host: "ep-steep-poetry-31551584.us-east-2.aws.neon.tech",
  port: 5432,
  database: "rimmindDB",
  // ssl: { rejectUnauthorized: false },
  ssl: { rejectUnauthorized: false },
});
interface cloudWrite {
  userid: string;
  title: string;
  user: string;
  desp: string;
  TagArray: string[];
  media: any[];
  ruid: string;
}

process.on("message", async (data: { ruid: string }) => {
  await DeleteDataInCloud(data);
});

async function DeleteDataInCloud(data: { ruid: string }): Promise<void> {
  const { ruid } = data;
  console.log(
    `come here to delete the record from the cloud with ruid - ${ruid}`
  );

  try {
    const result = await poolCloud.query(
      "DELETE FROM userrecords WHERE ruid = $1",
      [ruid]
    );

    console.log("Deleteed from thecloud");
  } catch (error) {
    console.error("Error Deleting to cloud database:", error);
    process.exit(1); // Exit with an error code
  } finally {
    poolCloud.end(); // Close the connection pool
    process.exit(0); // Exit with success code
  }
}
