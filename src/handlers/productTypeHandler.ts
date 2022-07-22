import { ProductTypes } from "./database/databaseHandler";
import { ProductTypeAttributes, ProductTypeCreationAttributes } from "./database/models/productType";

const getProductType = async (): Promise<any> => {
  const producttypes = await ProductTypes.findAll();
  return producttypes.map((productType) => productType.get());
};
const getProductTypeEntryByName = async (productType: string): Promise<any> => {
    const [productTypeEntry, created] = await ProductTypes.findOrCreate({
        where: { type: productType },
        defaults: { type: productType},
    });
    return {data: productTypeEntry.get(), created };
}

const addProductType = async (producttype: ProductTypeCreationAttributes): Promise<any> => {
  const newProductType = await ProductTypes.create(producttype);
  return newProductType.get();
};

/**
 * ignores all fields that are not included in the ProductCreationAttributes.
 * @param the product to update with all new values
 * @returns product the updated product
 */
const updateProductType = async (producttype: ProductTypeAttributes): Promise<any> => {
    return "feature coming soon...";
};

const deleteProductType = async (product: ProductTypeAttributes): Promise<any> => {
  return "feature coming soon...";
};

export { getProductType, getProductTypeEntryByName, addProductType, updateProductType, deleteProductType };
