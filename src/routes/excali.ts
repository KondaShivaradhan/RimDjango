import { Router, Request, Response, NextFunction } from "express";
import { UserFB, db } from "../utils/firebase";
const crypto = require("crypto");
const router = Router();

// Function to hash a password with salt
const hashPassword = (password: string, salt: string): string => {
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hashedPassword;
};

// Function to compare hashed passwords
const comparePasswords = (
  password: string,
  hashedPassword: string,
  salt: string
): boolean => {
  const newlyHashedPassword = hashPassword(password, salt);
  return hashedPassword === newlyHashedPassword;
};
router.post("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("came to signup with " + email, password);
  try {
    await db
      .collection("User")
      .doc(email)
      .get()
      .then(async (querySnapshot: any) => {
        if (querySnapshot.empty) {
          console.log("No User found Creating");
          try {
            // Assuming `email` and `pass` are provided as variables
            const hashedPassword = hashPassword(password, email);
            const newUser: UserFB = {
              data: [],
              email: email,
              ispaid: false,
              pass: hashedPassword,
            };
            // Save the user record in Firebase
            await db.collection("User").doc(email).set(newUser);
            res.send({
              status: "success",
              response: "User signed up successfully",
            });
          } catch (error) {
            console.log(error);
            res.status(501).send("Something went wrong");
          }
        } else {
          res.send({
            status: "failed",
            response: "User already exists",
          });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(501).send("Something wrong");
  }
});
router.post("/login", async (req: Request, res: Response) => {
  const { email, pass } = req.body;
  console.log("Ex Came to login with user" + email + " and pass " + pass);
  try {
    await db
      .collection("User")
      .doc(email)
      .get()
      .then((querySnapshot: any) => {
        if (querySnapshot.empty) {
          console.log("No matching document found");
          res.send({ status: "No user" });
        } else {
          const data = querySnapshot.data() as UserFB;
          if (data.pass === hashPassword(pass, email)) {
            res.send({ status: "Auth Passed", data });
          } else {
            res.send({ status: "Auth Failed" });
          }
          console.log(querySnapshot.id, " => ", data);
        }
      });
  } catch (error) {
    console.log(error);
    res.status(501).send("Something wrong");
  }
});
router.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Wrong URL");
});

export default router;
