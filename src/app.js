import express from "express";
const app = express();
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import "dotenv/config";
import cors from "cors";
import instanceConnection from "./databases/init.mongodb.js";
import { checkOverLoad } from "./helpers/checkConnect.config.js";
import route from "./routes/index.js";
// innit middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(helmet());
app.use(compression());
// init db
instanceConnection;
// checkOverLoad();
// init routes
route(app);
// init error handlers
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: "error",
        msg: error.message || "Internal Server Error",
    });
});
export default app;
