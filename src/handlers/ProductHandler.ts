import { Op } from "sequelize";
import { Products } from "./database/DatabaseHandler";
import { ProductAttributes, ProductCreationAttributes } from "./database/models/Product";

const getProducts = async (): Promise<any> => {
  const products = await Products.findAll();
  return products.map((product) => product.get());
};

/**
 * @returns all products that were created in the last hour.
 */
const getProductsOfTheLastHour = async (): Promise<any> => {
  const products = await Products.findAll({
    where: {
      createdat: {
        [Op.gt]: new Date(Date.now() - 3600000),
      },
      available: true,
    },
  });
  return products.map((product) => product.get());
};

const addProduct = async (product: ProductCreationAttributes): Promise<any> => {
  const newProduct = await Products.create(product);
  return newProduct.get();
};

/**
 * ignores all fields that are not included in the ProductCreationAttributes.
 * @param the product to update with all new values
 * @returns product the updated product
 */
const updateProduct = async (product: ProductAttributes): Promise<any> => {
  const productToUpdate = await Products.findByPk(product.id);
  if(!productToUpdate) return "product not found";
  const fieldsToUpdate: (keyof ProductCreationAttributes)[] = [
    "title",
    "description",
    "price",
    "link",
    "thumbnail",
    "image",
    "websitename",
    "available",
    "availability",
    "type",
    "productname",
    "additionalfields",
  ];
  productToUpdate.update(product as ProductCreationAttributes, { fields: fieldsToUpdate });
  return productToUpdate.get();
};

const deleteProduct = async (product: ProductAttributes): Promise<any> => {
  return "feature coming soon...";
};

export { getProducts, addProduct, updateProduct, deleteProduct, getProductsOfTheLastHour };
