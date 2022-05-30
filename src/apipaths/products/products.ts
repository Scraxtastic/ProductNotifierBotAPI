import express from "express";
import { addProduct, deleteProduct, getProducts, getProductsOfTheLastHour, updateProduct } from "../../handlers/ProductHandler";
const productRouter = express.Router();

productRouter.get("/all", async (req, res) => {
  res.send(await getProducts());
});

productRouter.get("/", async (req, res) => {
  res.send(await getProductsOfTheLastHour());
});

productRouter.post("/", async (req, res) => {
  res.send(await addProduct(req.body));
});

productRouter.put("/", async (req, res) => {
  res.send(await updateProduct(req.body));
});

productRouter.delete("/", async (req, res) => {
  res.send(await deleteProduct(req.body));
});

export default productRouter;
