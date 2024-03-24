"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebase_1 = require("../utils/firebase");
const crypto = require("crypto");
const router = (0, express_1.Router)();
// Function to hash a password with salt
const hashPassword = (password, salt) => {
    const hashedPassword = crypto
        .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
        .toString(`hex`);
    return hashedPassword;
};
// Function to compare hashed passwords
const comparePasswords = (password, hashedPassword, salt) => {
    const newlyHashedPassword = hashPassword(password, salt);
    return hashedPassword === newlyHashedPassword;
};
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("came to signup with " + email, password);
    try {
        yield firebase_1.db
            .collection("User")
            .doc(email)
            .get()
            .then((querySnapshot) => __awaiter(void 0, void 0, void 0, function* () {
            if (querySnapshot.empty) {
                console.log("No User found Creating");
                try {
                    // Assuming `email` and `pass` are provided as variables
                    const hashedPassword = hashPassword(password, email);
                    const newUser = {
                        data: [],
                        email: email,
                        ispaid: false,
                        pass: hashedPassword,
                    };
                    // Save the user record in Firebase
                    yield firebase_1.db.collection("User").doc(email).set(newUser);
                    res.send({
                        status: "success",
                        response: "User signed up successfully",
                    });
                }
                catch (error) {
                    console.log(error);
                    res.status(501).send("Something went wrong");
                }
            }
            else {
                res.send({
                    status: "failed",
                    response: "User already exists",
                });
            }
        }));
    }
    catch (error) {
        console.log(error);
        res.status(501).send("Something wrong");
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("Ex Came to login with user " + email + " and pass " + password);
    try {
        yield firebase_1.db
            .collection("User")
            .doc(email)
            .get()
            .then((querySnapshot) => {
            if (querySnapshot.empty) {
                console.log("No matching document found");
                res.send({ status: "No user" });
            }
            else {
                const data = querySnapshot.data();
                console.log('====================================');
                console.log(password);
                console.log(hashPassword(password, email));
                console.log('====================================');
                console.log(querySnapshot.data());
                if (querySnapshot.data() && email === querySnapshot.id && data.pass === hashPassword(password, email)) {
                    console.log(querySnapshot.id, " => ", data);
                    res.status(200).send({ status: "Auth Passed", data });
                }
                else {
                    console.log("Auth failed");
                    res.status(401).send({ status: "Auth Failed", data: null });
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(501).send("Something wrong");
    }
}));
/**
 * API call to save the current record
 * First checks the name is not dublicated.
 * saved by creating a document with the given name
 */
router.post("/save", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, canvasdata } = req.body;
    console.log("Ex Came to save with name " + name + " and data " + canvasdata);
    try {
        yield firebase_1.db
            .collection("User")
            .doc(email)
            .get()
            .then((querySnapshot) => __awaiter(void 0, void 0, void 0, function* () {
            if (querySnapshot.empty) {
                console.log("No matching document found");
                res.send({ status: "No user", data: null });
            }
            else {
                const data = querySnapshot.data();
                console.log(data);
                const Fdata = data.data.concat({ name: name, canvasData: canvasdata });
                const newUser = {
                    data: Fdata,
                    email: data.email,
                    ispaid: data.ispaid,
                    pass: data.pass,
                };
                try {
                    yield firebase_1.db.collection("User").doc(email).update(newUser).then((res2) => {
                        console.log("After adding");
                        console.log(res2);
                        res.status(200).send({ status: "Saved Record" });
                    });
                }
                catch (error) {
                }
            }
        }));
    }
    catch (error) {
        console.log(error);
        res.status(501).send("Something wrong at saving record");
    }
}));
/**
 * Update a record with a given name and email
 */
router.post("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, canvasdata } = req.body;
    console.log("Ex Came to udpate with name " + name + " and data " + canvasdata);
    try {
        yield firebase_1.db
            .collection("User")
            .doc(email)
            .get()
            .then((querySnapshot) => __awaiter(void 0, void 0, void 0, function* () {
            if (querySnapshot.empty) {
                console.log("No matching document found");
                res.send({ status: "No user", data: null });
            }
            else {
                const data = querySnapshot.data();
                console.log(data);
                data.data.forEach((Canvas) => {
                    if (Canvas.name === name) {
                        Canvas.canvasData = canvasdata;
                    }
                });
                // const Fdata = data.data.concat({ name: name, canvasData: canvasdata })
                const newUser = {
                    data: data.data,
                    email: data.email,
                    ispaid: data.ispaid,
                    pass: data.pass,
                };
                try {
                    yield firebase_1.db.collection("User").doc(email).update(newUser).then((res2) => {
                        console.log("After adding");
                        console.log(res2);
                        res.status(200).send({ status: "Saved Record" });
                    });
                }
                catch (error) {
                }
            }
        }));
    }
    catch (error) {
        console.log(error);
        res.status(501).send("Something wrong at saving record");
    }
}));
/**
 * Get all records for a user with email
*/
router.post("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    console.log("Ex Came to fetch all  with user " + email);
    try {
        yield firebase_1.db
            .collection("User")
            .doc(email)
            .get()
            .then((querySnapshot) => {
            if (querySnapshot.empty) {
                console.log("No matching document found");
                res.send({ status: "No user" });
            }
            else {
                console.log(querySnapshot.data());
                const data = querySnapshot.data();
                res.status(200).send({ status: "Found records", data });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(501).send("Something wrong");
    }
}));
// delete a record
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // email, name
    const { email, name } = req.body;
    console.log("Ex came to delete record with name - ", name, " for user - ", email);
    try {
        yield firebase_1.db
            .collection("User")
            .doc(email)
            .get()
            .then((querySnapshot) => __awaiter(void 0, void 0, void 0, function* () {
            if (querySnapshot.empty) {
                console.log("No matching document found");
                res.send({ status: "No user", data: null });
            }
            else {
                const Object = querySnapshot.data();
                console.log(Object);
                const Fdata = Object.data.filter(item => item.name !== name);
                const newUser = {
                    data: Fdata,
                    email: Object.email,
                    ispaid: Object.ispaid,
                    pass: Object.pass,
                };
                try {
                    yield firebase_1.db.collection("User").doc(email).update(newUser).then((res2) => {
                        console.log("Delete of record successfull!");
                        res.status(200).send({ status: "Updated Record" });
                    });
                }
                catch (error) {
                    res.status(500).send({ status: "Update failed in delete" });
                }
            }
        }));
    }
    catch (error) {
        console.log(error);
        res.status(501).send("Something wrong at saving record");
    }
}));
router.use((req, res, next) => {
    res.status(404).send("Wrong URL");
});
exports.default = router;
