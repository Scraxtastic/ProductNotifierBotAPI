import { Op } from "sequelize";
import { getCompanyNameEntryByName } from "./companyNameHandler";
import { ProductSnapshots, Products, CompanyNames } from "./database/databaseHandler";
import Product, { ProductAttributes, ProductCreationAttributes } from "./database/models/product";
import { ProductSnapshotAttributes } from "./database/models/productSnapshot";
import { getProductNameEntryByName } from "./productNameHandler";
import { getProductTypeEntryByName } from "./productTypeHandler";

const getProductID = async (productToFind: ProductCreationAttributes): Promise<any> => {
  return (await getProduct(productToFind)).id;
};

const getProduct = async (productToFind: ProductCreationAttributes): Promise<any> => {
  const { title, description, link, thumbnail, image, websitename, additionalfields } = productToFind;
  const [product, created] = await Products.findOrCreate({
    where: {
      [Op.and]: [{ title }, { websitename }, { description }, { link }, { thumbnail }, { image }, { additionalfields }],
    },
    defaults: {title, description, link, thumbnail, image, websitename, additionalfields},
  });
  return { data: product.get(), created };
};

const getProducts = async (): Promise<any> => {
  const products = await Products.findAll();
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

const addProduct = async (product: ProductCreationAttributes): Promise<any> => {
  const newProduct = await Products.create(product);
  return newProduct.get();
};

const addProducts = async (products: ProductCreationAttributes[]): Promise<any> => {
  const newProducts = await Products.bulkCreate(products);
  const data = newProducts.map((product) => product.get());
  return { data };
};

/**
 * ignores all fields that are not included in the ProductCreationAttributes.
 * @param the product to update with all new values
 * @returns product the updated product
 */
const updateProduct = async (product: ProductAttributes): Promise<any> => {
  const productToUpdate = await Products.findByPk(product.id);
  if (!productToUpdate) return "product not found";
  const fieldsToUpdate: (keyof ProductAttributes)[] = [
    "title",
    "description",
    "link",
    "thumbnail",
    "image",
    "websitename",
    "additionalfields",
    "updatedat",
  ];
  product.updatedat = new Date();
  productToUpdate.update(product as ProductCreationAttributes, {
    fields: fieldsToUpdate,
  });
  return productToUpdate.get();
};

const deleteProduct = async (product: ProductAttributes): Promise<any> => {
  return "feature coming soon...";
};

export { getProduct, getProducts, addProduct, addProducts, updateProduct, deleteProduct, getProductsOfTheLastHour };
