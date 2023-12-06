import axios from "axios";
import pool, { poolCloud } from "../postdb";
const urls = {
  root: "https://platypus-bold-sturgeon.ngrok-free.app/",
  rimRoot: "https://platypus-bold-sturgeon.ngrok-free.app/rim",
};
describe("Server Status", () => {
  it('should respond with "Im alive"', async () => {
    const response = await axios.get(urls.root);
    expect(response.data).toBe("html");
  });
  it("should respond with a 200 status code", async () => {
    const response = await axios.get(urls.root);
    expect(response.status).toBe(200);
  });
  //   it("should respond with 'Wrong URL' for invalid URL", async () => {
  //     const response = await axios.get(`${urls.root}usdfsd`);
  //     expect(response.status).toBe(404);
  //     expect(response.data).toEqual(expect.stringContaining("Wrong URL"));
  //   });
});
var testAccount = {
  email: "test@gmail.com",
};
var testNewAccount = {
  email: "testnew@gmail.com",
};
describe("creating a new User", () => {
  it("creating a record of user ", async () => {
    const response = await axios.post(urls.rimRoot, testAccount);
    expect(response.data).toBe("exists");
  });
  test("should check of local database for New record", async () => {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [testAccount.email]
    );

    expect(existingUser.rows[0]).toMatchObject({
      email: "test@gmail.com",
      foldername: "",
      backupmegaacc: "kondashivaradhan007@gmail.com",
      quota: "1024.00",
    });
  });
  test("should check of cloud database for New record", async () => {
    const existingUser = await poolCloud.query(
      "SELECT * FROM users WHERE email = $1",
      [testAccount.email]
    );

    expect(existingUser.rows[0]).toMatchObject({
      email: `${testAccount.email}`,
      foldername: "",
      backupmegaacc: "kondashivaradhan007@gmail.com",
      quota: "1024.00",
    });
  }, 120000);
});
const newRecord = {
  title: "testTitle",
  user: testAccount.email,
  TagArray: ["check", "tesing"],
  desp: `test descripton of all special char !@#!$@#$@#$!@#!"!@#!@!"!@#!@";;; asdfasd; '' ,asdf,a. asdfasdf`,
};
describe("Testing Record Creation", () => {
  it("creating a record ", async () => {
    const response = await axios.post(urls.rimRoot + "/add", newRecord);
    expect(response.data).toMatchObject({ message: "Data added successfully" });
  });
  test("should check of local database for New record", async () => {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [testAccount.email]
    );

    console.log(existingUser.rows);
    expect(existingUser.rows[0]).toMatchObject({
      email: "test@gmail.com",
      foldername: "",
      backupmegaacc: "kondashivaradhan007@gmail.com",
      quota: "1024.00",
    });
  });
  test("should check of cloud database for New record", async () => {
    const existingUser = await poolCloud.query(
      "SELECT * FROM users WHERE email = $1",
      [testAccount.email]
    );

    console.log(existingUser.rows);
    expect(existingUser.rows[0]).toMatchObject({
      email: "test@gmail.com",

      foldername: "",
      backupmegaacc: "kondashivaradhan007@gmail.com",
      quota: "1024.00",
    });
  }, 120000);
});
