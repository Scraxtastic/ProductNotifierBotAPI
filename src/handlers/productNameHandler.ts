import { ProductNames, ProductTypes } from "./database/databaseHandler";
import { ProductNameAttributes, ProductNameCreationAttributes } from "./database/models/productName";
import { getProductTypeEntryByName } from "./productTypeHandler";

const getProductName = async (): Promise<any> => {
  const productnames = await ProductNames.findAll();
  return productnames.map((productName) => productName.get());
};
const getProductNameEntryByName = async (productName: string): Promise<any> => {
  let productNameEntry = await ProductNames.findOne({
    where: { productname: productName },
  });
  if (productNameEntry) return { company: productNameEntry.get(), created: false };
  console.log("productNameEntry", productNameEntry);

  const productTypeEntry = (await getProductTypeEntryByName("Not Set")).data;
  console.log("ProductTypeEntry", productTypeEntry);
  // return "DFHASKFHA";
  productNameEntry = await ProductNames.create({ productname: productName, productTypeID: productTypeEntry.id });
  return {data: productNameEntry.get(), created: true };
};

const addProductName = async (productname: ProductNameCreationAttributes): Promise<any> => {
  const newProductName = await ProductNames.create(productname);
  return newProductName.get();
};

/**
 * ignores all fields that are not included in the ProductCreationAttributes.
 * @param the product to update with all new values
 * @returns product the updated product
 */
const updateProductName = async (productname: ProductNameAttributes): Promise<any> => {
  return "feature coming soon...";
};

const deleteProductName = async (product: ProductNameAttributes): Promise<any> => {
  return "feature coming soon...";
};

export { getProductName, getProductNameEntryByName, addProductName, updateProductName, deleteProductName };
