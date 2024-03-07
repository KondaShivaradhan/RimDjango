"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rimmind_1 = __importDefault(require("./routes/rimmind"));
const excali_1 = __importDefault(require("./routes/excali"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = require("express-rate-limit");
const app = (0, express_1.default)();
// Specify the allowed origins
const allowedOrigins = [
    "https://rimmind.blazingbane.com",
    "http://192.168.1.32:5173",
    "http://192.168.1.6:5173",
];
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
});
const myMiddleware = (req, res, next) => {
    // Perform some logic or actions here
    next();
};
app.use(limiter);
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin ||
            allowedOrigins.includes(origin) ||
            origin.startsWith("chrome-extension")) {
            console.log("Valid cors");
            callback(null, true);
        }
        else {
            console.log(origin);
            callback(new Error("Not allowed by CORS"));
            app.use((req, res, next) => {
                res.status(404).send("Wrong URL");
            });
            app.use((err, req, res, next) => {
                console.error(err.stack);
                res.status(500).json({ error: "Something went wrong!" });
            });
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));
app.get("/", myMiddleware, (req, res) => {
    res.send("html");
});
app.use("/rim", myMiddleware, rimmind_1.default);
app.use("/excali", myMiddleware, excali_1.default);
app.use((req, res, next) => {
    res.status(404).send("Wrong URL");
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});
exports.default = app;
