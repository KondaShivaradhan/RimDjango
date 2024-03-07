"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const postdb_1 = __importStar(require("../postdb"));
const urls = {
    root: "https://platypus-bold-sturgeon.ngrok-free.app/",
    rimRoot: "https://platypus-bold-sturgeon.ngrok-free.app/rim",
};
describe("Server Status", () => {
    it('should respond with "Im alive"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.get(urls.root);
        expect(response.data).toBe("html");
    }));
    it("should respond with a 200 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.get(urls.root);
        expect(response.status).toBe(200);
    }));
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
    it("creating a record of user ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.post(urls.rimRoot, testAccount);
        expect(response.data).toBe("exists");
    }));
    test("should check of local database for New record", () => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield postdb_1.default.query("SELECT * FROM users WHERE email = $1", [testAccount.email]);
        expect(existingUser.rows[0]).toMatchObject({
            email: "test@gmail.com",
            foldername: "",
            backupmegaacc: "kondashivaradhan007@gmail.com",
            quota: "1024.00",
        });
    }));
    test("should check of cloud database for New record", () => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield postdb_1.poolCloud.query("SELECT * FROM users WHERE email = $1", [testAccount.email]);
        expect(existingUser.rows[0]).toMatchObject({
            email: `${testAccount.email}`,
            foldername: "",
            backupmegaacc: "kondashivaradhan007@gmail.com",
            quota: "1024.00",
        });
    }), 120000);
});
const newRecord = {
    title: "testTitle",
    user: testAccount.email,
    TagArray: ["check", "tesing"],
    desp: `test descripton of all special char !@#!$@#$@#$!@#!"!@#!@!"!@#!@";;; asdfasd; '' ,asdf,a. asdfasdf`,
};
describe("Testing Record Creation", () => {
    it("creating a record ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.post(urls.rimRoot + "/add", newRecord);
        expect(response.data).toMatchObject({ message: "Data added successfully" });
    }));
    test("should check of local database for New record", () => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield postdb_1.default.query("SELECT * FROM users WHERE email = $1", [testAccount.email]);
        console.log(existingUser.rows);
        expect(existingUser.rows[0]).toMatchObject({
            email: "test@gmail.com",
            foldername: "",
            backupmegaacc: "kondashivaradhan007@gmail.com",
            quota: "1024.00",
        });
    }));
    test("should check of cloud database for New record", () => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield postdb_1.poolCloud.query("SELECT * FROM users WHERE email = $1", [testAccount.email]);
        console.log(existingUser.rows);
        expect(existingUser.rows[0]).toMatchObject({
            email: "test@gmail.com",
            foldername: "",
            backupmegaacc: "kondashivaradhan007@gmail.com",
            quota: "1024.00",
        });
    }), 120000);
});
