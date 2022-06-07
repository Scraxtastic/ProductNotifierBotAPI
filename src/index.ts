require('source-map-support').install();
import express from "express";
import productRouter from "./apipaths/products/products";
import 'dotenv/config';
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import { testConnection } from "./handlers/database/DatabaseHandler";
import helmet from "helmet";

const port = process.env.APIPort; // default port to listen
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

app.use(bodyParser.json());


// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});


app.use("/products", productRouter);


// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });

testConnection();


