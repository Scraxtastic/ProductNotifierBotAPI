import express from "express";
import { addProduct, getProducts } from "../../handlers/ProductHandler";
const productRouter = express.Router();


productRouter.get("/", async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

productRouter.post("/", async (req, res) => {    
    // const result = addProduct();
    // res.send(result);
    res.send("OK")
});

export default productRouter;
