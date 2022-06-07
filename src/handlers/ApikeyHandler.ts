import { Op } from "sequelize";
import { Apikeys } from "./database/DatabaseHandler";
import Apikey, { ApikeyAttributes, ApikeyCreationAttributes } from "./database/models/Apikey";

const getApikeys = async (): Promise<any> => {
  const apikeys = await Apikeys.findAll();
  return apikeys.map((product) => product.get());
};

const addApikey = async (apikey: ApikeyCreationAttributes): Promise<any> => {
  if (!isApikeyValid(apikey)) return "given product is not valid";
  const newApikey = await Apikeys.create(apikey);
  return newApikey.get();
};

/**
 * ignores all fields that are not included in the ProductCreationAttributes.
 * @param the product to update with all new values
 * @returns product the updated product
 */
const updateApikey = async (apikey: ApikeyAttributes): Promise<any> => {
  if (!isApikeyValid(apikey)) return "given product is not valid";
  const productToUpdate = await Apikeys.findByPk(apikey.id);
  if (!productToUpdate) return "product not found";
  const fieldsToUpdate: (keyof ApikeyCreationAttributes)[] = ["givenTo", "permissions"];
  productToUpdate.update(apikey as ApikeyCreationAttributes, { fields: fieldsToUpdate });
  return productToUpdate.get();
};

const deleteApikey = async (product: ApikeyAttributes): Promise<any> => {
  return "feature coming soon...";
};

/**
 * checks if all variables that are neccessary are not null.
 * @param apikey the product to check if it is valid
 * @returns true if the product is valid, false otherwise
 */
const isApikeyValid = (apikey: ApikeyCreationAttributes) => {
  if (!apikey.givenTo || !apikey.permissions) return false;
  return true;
};

export { getApikeys, addApikey, updateApikey, deleteApikey };
