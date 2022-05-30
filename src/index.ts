import express from "express";
import productRouter from "./apipaths/products/products";
import 'dotenv/config';

import { testConnection } from "./handlers/database/DatabaseHandler";
const app = express();
const port = 8080; // default port to listen

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