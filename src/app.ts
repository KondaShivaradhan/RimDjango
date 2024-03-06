import express, { NextFunction, Request, Response } from "express";
import rimRouter from "./routes/rimmind";
import excalRouter from "./routes/excali";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { log } from "console";

const app = express();
// Specify the allowed origins
const allowedOrigins = [
  "https://rimmind.blazingbane.com",
  "http://192.168.1.32:5173",
  "http://192.168.1.6:5173",
];

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});
const myMiddleware = (req: Request, res: Response, next: Function) => {
  // Perform some logic or actions here

  next();
};
app.use(limiter);
app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.startsWith("chrome-extension")
      ) {
        console.log("Valid cors");

        callback(null, true);
      } else {
        console.log(origin);
        callback(new Error("Not allowed by CORS"));
        app.use((req: Request, res: Response, next: NextFunction) => {
          res.status(404).send("Wrong URL");
        });

        app.use(
          (err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).json({ error: "Something went wrong!" });
          }
        );
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.get("/", myMiddleware, (req: Request, res: Response) => {
  res.send("html");
});
app.use("/rim", myMiddleware, rimRouter);
app.use("/excali", myMiddleware, excalRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Wrong URL");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;
