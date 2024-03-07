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
    const { email, pass } = req.body;
    console.log("Ex Came to login with user " + email + " and pass " + pass);
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
                console.log(querySnapshot.data());
                if (querySnapshot.data() && email === querySnapshot.id && data.pass === hashPassword(pass, email)) {
                    console.log(querySnapshot.id, " => ", data);
                    res.status(200).send({ status: "Auth Passed", data });
                }
                else {
                    console.log("Auth failed");
                    res.status(401).send({ status: "Auth Failed" });
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(501).send("Something wrong");
    }
}));
router.use((req, res, next) => {
    res.status(404).send("Wrong URL");
});
exports.default = router;
