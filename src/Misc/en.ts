// import { Pool } from "pg";
// import CryptoJS from "crypto-js";

// const pool = new Pool({
//   user: "postgres",
//   password: "new_password",
//   host: "127.0.0.1",
//   port: 5432,
//   database: "rimmindDB",
//   // haElMPY70TOc
//   //   TqMtHaiLCZ57
//   ssl: { rejectUnauthorized: false },
// });
// interface Record {
//   userid: number;
//   title: string;
//   description: string;
//   tags: string[];
//   media: any[];
//   ruid: string;
// }
// async function processRows() {
//   const client = await pool.connect();

//   try {
//     const result = await client.query("SELECT * FROM users");
//     const rows = result.rows;
//     for (const user of rows) {
//       // Your script logic for each row goes here
//       const email = user.email;

//       const allrecords = await client.query(
//         "SELECT * FROM userrecords WHERE userid=$1;",
//         [user.id]
//       );

//       for (const row of allrecords.rows) {
//         const now: Record = row;
//         console.log(now.description);
//         const encryptedArray = now.tags.map((str) => Encrpt(str, email));

//         const updated: Record = {
//           userid: now.userid,
//           title: Encrpt(now.title, email),
//           description: Encrpt(now.description, email),
//           media: now.media,
//           ruid: now.ruid,
//           tags: encryptedArray,
//         };
//         await pool.query(
//           "UPDATE userrecords SET title = $1, description = $2, tags = $3 WHERE ruid = $4",
//           [updated.title, updated.description, updated.tags, updated.ruid]
//         );
//       }
//     }
//   } finally {
//     client.release();
//   }
// }

// const Decrpt = (str: string, email: string) => {
//   const bytes = CryptoJS.AES.decrypt(str, email);
//   const ori = bytes.toString(CryptoJS.enc.Utf8);
//   return ori;
// };
// const Encrpt = (str: string, email: string) => {
//   return CryptoJS.AES.encrypt(str, email).toString();
// };
// processRows();
