import express from "express";
import {
  addProduct,
  addProducts,
  deleteProduct,
  getProduct,
  getProducts,
  getProductsOfTheLastHour,
  updateProduct,
} from "../../handlers/productHandler";
const productRouter = express.Router();

productRouter.get("/all", async (req, res) => {
  res.send(await getProducts());
});

productRouter.get("/", async (req, res) => {
  const title = req.headers.title+"";
  const websitename = req.headers.websitename+"";
  res.send(await getProduct(title, websitename));
});

productRouter.post("/", async (req, res) => {
  res.send(await addProduct(req.body));
});

productRouter.post("/bulk", async (req, res) => {
  res.send(await addProducts(req.body));
});

productRouter.put("/", async (req, res) => {
  res.send(await updateProduct(req.body));
});

productRouter.delete("/", async (req, res) => {
  res.send(await deleteProduct(req.body));
});

export default productRouter;
