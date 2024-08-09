import express, { Request, Response, NextFunction } from "express";
import Logger from "./core/logger";
import bodyParser from "body-parser";
import cors from "cors";
import { corsUrl, environment } from "./config";
import "./database"; // initialize database
import routesV1 from "./routes/v1";
import swaggerDocs from "./swagger";
import swaggerUI from "swagger-ui-express";

process.on("uncaughtException", (e) => {
  Logger.error(e);
});

const app = express();

app.disable("x-powered-by");

app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

// Routes
app.use("/api/v1", routesV1);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({ message: "Resource not found" });
});

// Middleware Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error("Error:", err);

  if (environment === "development") {
    res.status(500).send({ error: err.message, stack: err.stack });
  } else {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default app;
