import { Products } from "./database/DatabaseHandler";
import { ProductAttributes, ProductCreationAttributes } from "./database/models/Product";

const getProducts = async (): Promise<any> => {
  const products = await Products.findAll();
  return products.map((product) => product.get());
};

const addProduct = async (product: ProductCreationAttributes): Promise<any> => {
  const products = await Products.findAll({ where: { id: 1 } });
  // products.forEach((product) => {
  // product.title = "test";
  //   product.save();
  // });
  await Products.create({});
  return true;
};

export { getProducts, addProduct };
