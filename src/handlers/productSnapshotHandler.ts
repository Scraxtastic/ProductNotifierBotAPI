import { Op } from "sequelize";
import { ProductSnapshots } from "./database/databaseHandler";
import { ProductSnapshotCreationAttributes, ProductSnapshotAttributes } from "./database/models/productSnapshot";

const getProducts = async (): Promise<any> => {
  const products = await ProductSnapshots.findAll();
  return products.map((product) => product.get());
};

/**
 * @returns all products that were created in the last hour.
 */
const getProductsOfTheLastHour = async (): Promise<any> => {
  const products = await ProductSnapshots.findAll({
    where: {
      createdat: {
        [Op.gt]: new Date(Date.now() - 3600000),
      },
      available: true,
    },
  });
  return products.map((product) => product.get());
};

const addProduct = async (product: ProductSnapshotCreationAttributes): Promise<any> => {
  const newProduct = await ProductSnapshots.create(product);
  return newProduct.get();
};

const addProducts = async (products: ProductSnapshotCreationAttributes[]): Promise<any> => {
  const newProducts = await ProductSnapshots.bulkCreate(products);
  const data = newProducts.map((product) => product.get());
  return { data };
};

/**
 * ignores all fields that are not included in the ProductCreationAttributes.
 * @param the product to update with all new values
 * @returns product the updated product
 */
const updateProduct = async (product: ProductSnapshotAttributes): Promise<any> => {
  const productToUpdate = await ProductSnapshots.findByPk(product.id);
  if (!productToUpdate) return "product not found";
  const fieldsToUpdate: (keyof ProductSnapshotAttributes)[] = ["price", "available", "availability", "updatedat"];
  product.updatedat = new Date();
  productToUpdate.update(product as ProductSnapshotCreationAttributes, {
    fields: fieldsToUpdate,
  });
  return productToUpdate.get();
};

const deleteProduct = async (product: ProductSnapshotAttributes): Promise<any> => {
  return "feature coming soon...";
};

export { getProducts, addProduct, addProducts, updateProduct, deleteProduct, getProductsOfTheLastHour };
