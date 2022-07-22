require("source-map-support").install();
import express from "express";
import productRouter from "./apipaths/products/productRouter";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import { testConnection } from "./handlers/database/databaseHandler";
import helmet from "helmet";
import productSnapshotRouter from "./apipaths/productSnapshots/productSnapshotRouter";

const port = process.env.APIPort; // default port to listen
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

app.use(bodyParser.json({ limit: "50mb" }));

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

app.use((req, res, next) => {
  const apikey = req.headers["authorization"];
  let hasAccess = false;
  const f = (apikey: string, path: string, method: string) => {
    if (method === "Options") {
      return true;
    }
    if (path.startsWith("/public")) {
      return true;
    }
    return false;
  };
  hasAccess = f(apikey, req.path, req.method);
  //TODO
  hasAccess = true;
  if (!hasAccess) {
    res.status(401).send("Unauthorized");
    return;
  }
  next();
});

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/products", productRouter);
app.use("/productsnapshots", productSnapshotRouter);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

testConnection();
