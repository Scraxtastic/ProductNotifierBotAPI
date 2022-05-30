import express from "express";
import productRouter from "./apipaths/products/products";
import 'dotenv/config';
import bodyParser from "body-parser";

import { testConnection } from "./handlers/database/DatabaseHandler";

const app = express();
const port = process.env.APIPort; // default port to listen

app.use(bodyParser.json());

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