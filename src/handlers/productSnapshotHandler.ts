import { Op } from "sequelize";
import { ICompleteProduct } from "../models/ICompleteProduct";
import { Products, ProductSnapshots } from "./database/databaseHandler";
import { ProductSnapshotCreationAttributes, ProductSnapshotAttributes } from "./database/models/productSnapshot";
import { getProduct } from "./productHandler";

const getProductSnapshots = async (): Promise<any> => {
  const products = await ProductSnapshots.findAll();
  return products.map((product) => product.get());
};

/**
 * @returns all products that were created in the last hour.
 */
const getProductSnapshotsOfTheLastHour = async (): Promise<any> => {
  const products = await ProductSnapshots.findAll({
    where: {
      createdat: {
        [Op.gt]: new Date(Date.now() - 3600000),
      },
      available: true,
    },
    include: [Products],
  });
  return products.map((product) => product.get());
};

const addProductSnapshot = async (product: ICompleteProduct): Promise<any> => {
  console.log("addProductSnapshot", product);
  const { price, availability, available } = product;

  const foundProduct = await getProduct(product);
  console.log("foundProduct", foundProduct);
  
  const newProduct = await ProductSnapshots.create({ price, availability, available, productID: foundProduct.data.id });
  return newProduct.get();
};

const addProductSnapshots = async (products: ProductSnapshotCreationAttributes[]): Promise<any> => {
  const newProducts = await ProductSnapshots.bulkCreate(products);
  const data = newProducts.map((product) => product.get());
  return { data };
};

/**
 * ignores all fields that are not included in the ProductCreationAttributes.
 * @param the product to update with all new values
 * @returns product the updated product
 */
const updateProductSnapshot = async (product: ProductSnapshotAttributes): Promise<any> => {
  const productToUpdate = await ProductSnapshots.findByPk(product.id);
  if (!productToUpdate) return "product not found";
  const fieldsToUpdate: (keyof ProductSnapshotAttributes)[] = ["price", "available", "availability", "updatedat"];
  product.updatedat = new Date();
  productToUpdate.update(product as ProductSnapshotCreationAttributes, {
    fields: fieldsToUpdate,
  });
  return productToUpdate.get();
};

const deleteProductSnapshot = async (product: ProductSnapshotAttributes): Promise<any> => {
  return "feature coming soon...";
};

export {
  getProductSnapshots,
  addProductSnapshot,
  addProductSnapshots,
  updateProductSnapshot,
  deleteProductSnapshot,
  getProductSnapshotsOfTheLastHour,
};
