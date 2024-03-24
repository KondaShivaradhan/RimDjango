import e, { Router, Request, Response, NextFunction } from "express";
import { UserFB, db } from "../utils/firebase";
import { log } from "console";
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
  const { email, password } = req.body;

  console.log("Ex Came to login with user " + email + " and pass " + password);
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
          console.log('====================================');
          console.log(password);
          console.log(hashPassword(password, email));
          console.log('====================================');
          console.log(querySnapshot.data());
          if (querySnapshot.data() && email === querySnapshot.id && data.pass === hashPassword(password, email)) {
            console.log(querySnapshot.id, " => ", data);
            res.status(200).send({ status: "Auth Passed", data });
          } else {
            console.log("Auth failed");
            res.status(401).send({ status: "Auth Failed", data: null });
          }
        }
      });
  } catch (error) {
    console.log(error);
    res.status(501).send("Something wrong");
  }
});
/**
 * API call to save the current record
 * First checks the name is not dublicated. 
 * saved by creating a document with the given name
 */
router.post("/save", async (req: Request, res: Response) => {
  const { email, name, canvasdata } = req.body;

  console.log("Ex Came to save with name " + name + " and data " + canvasdata);
  try {
    await db
      .collection("User")
      .doc(email)
      .get()
      .then(async (querySnapshot: any) => {
        if (querySnapshot.empty) {
          console.log("No matching document found");
          res.send({ status: "No user", data: null });
        } else {
          const data = querySnapshot.data() as UserFB;
          console.log(data);
          const Fdata = data.data.concat({ name: name, canvasData: canvasdata })
          const newUser: UserFB = {
            data: Fdata,
            email: data.email,
            ispaid: data.ispaid,
            pass: data.pass,
          };
          try {
            await db.collection("User").doc(email).update(newUser).then((res2: any) => {
              console.log("After adding");
              console.log(res2);
              res.status(200).send({ status: "Saved Record" });
            })
          } catch (error) {

          }

        }
      });
  } catch (error) {
    console.log(error);
    res.status(501).send("Something wrong at saving record");
  }
})
/**
 * Update a record with a given name and email
 */
router.post("/update", async (req: Request, res: Response) => {
  const { email, name, canvasdata } = req.body;

  console.log("Ex Came to udpate with name " + name + " and data " + canvasdata);
  try {
    await db
      .collection("User")
      .doc(email)
      .get()
      .then(async (querySnapshot: any) => {
        if (querySnapshot.empty) {
          console.log("No matching document found");
          res.send({ status: "No user", data: null });
        } else {
          const data = querySnapshot.data() as UserFB;
          console.log(data);
          data.data.forEach((Canvas)=>{
            if(Canvas.name === name){
              Canvas.canvasData = canvasdata
            }
          })
          // const Fdata = data.data.concat({ name: name, canvasData: canvasdata })
          const newUser: UserFB = {
            data: data.data,
            email: data.email,
            ispaid: data.ispaid,
            pass: data.pass,
          };
          try {
            await db.collection("User").doc(email).update(newUser).then((res2: any) => {
              console.log("After adding");
              console.log(res2);
              res.status(200).send({ status: "Saved Record" });
            })
          } catch (error) {

          }

        }
      });
  } catch (error) {
    console.log(error);
    res.status(501).send("Something wrong at saving record");
  }
})
/** 
 * Get all records for a user with email
*/
router.post("/all", async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log("Ex Came to fetch all  with user " + email);
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
          
          console.log(querySnapshot.data());
          const data = querySnapshot.data() as UserFB;
          res.status(200).send({ status: "Found records",data });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(501).send("Something wrong");
  }
});
// delete a record
router.delete('/',async (req:Request,res:Response)=>{
  // email, name
  const { email,name } = req.body;
  console.log("Ex came to delete record with name - ",name," for user - ",email);
  try {
    await db
      .collection("User")
      .doc(email)
      .get()
      .then(async (querySnapshot: any) => {
        if (querySnapshot.empty) {
          console.log("No matching document found");
          res.send({ status: "No user", data: null });
        } else {
          const Object = querySnapshot.data() as UserFB;
          console.log(Object);
          const Fdata = Object.data.filter(item => item.name !== name)
          const newUser: UserFB = {
            data: Fdata,
            email: Object.email,
            ispaid: Object.ispaid,
            pass: Object.pass,
          };
          try {
            await db.collection("User").doc(email).update(newUser).then((res2: any) => {
              console.log("Delete of record successfull!");
              
              res.status(200).send({ status: "Updated Record" });
            })
          } catch (error) {
            res.status(500).send({ status: "Update failed in delete" });

          }

        }
      });
  } catch (error) {
    console.log(error);
    res.status(501).send("Something wrong at saving record");
  }
})
router.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Wrong URL");
});

export default router;
