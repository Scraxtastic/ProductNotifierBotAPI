import { Op } from "sequelize";
import { Apikeys } from "./database/databaseHandler";
import Apikey, { ApikeyAttributes, ApikeyCreationAttributes } from "./database/models/apikey";

const getApikeys = async (): Promise<any> => {
  const apikeys = await Apikeys.findAll();
  return apikeys.map((apikey) => apikey.get());
};

const addApikey = async (apikey: ApikeyCreationAttributes): Promise<any> => {
  const newApikey = await Apikeys.create(apikey);
  return newApikey.get();
};

/**
 * ignores all fields that are not included in the ProductCreationAttributes.
 * @param the product to update with all new values
 * @returns product the updated product
 */
const updateApikey = async (apikey: ApikeyAttributes): Promise<any> => {
  const productToUpdate = await Apikeys.findByPk(apikey.id);
  if (!productToUpdate) return "product not found";
  const fieldsToUpdate: (keyof ApikeyCreationAttributes)[] = ["givenTo", "permissions"];
  productToUpdate.update(apikey as ApikeyCreationAttributes, { fields: fieldsToUpdate });
  return productToUpdate.get();
};

const deleteApikey = async (apikey: ApikeyAttributes): Promise<any> => {
  return "feature coming soon...";
};

export { getApikeys, addApikey, updateApikey, deleteApikey };
