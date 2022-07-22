import { CompanyNames } from "./database/databaseHandler";
import { CompanyNameAttributes, CompanyNameCreationAttributes } from "./database/models/companyName";

const getCompanyName = async (): Promise<any> => {
  const companynames = await CompanyNames.findAll();
  return companynames.map((companyNameEntry) => companyNameEntry.get());
};
const getCompanyNameEntryByName = async (companyName: string): Promise<any> => {
  const [company, created] = await CompanyNames.findOrCreate({
    where: { companyName: companyName },
    defaults: { companyName: companyName },
  });
  return {data: company.get(), created};
};

const addCompanyName = async (companyname: CompanyNameCreationAttributes): Promise<any> => {
  const newCompanyName = await CompanyNames.create(companyname);
  return newCompanyName.get();
};

/**
 * ignores all fields that are not included in the ProductCreationAttributes.
 * @param the product to update with all new values
 * @returns product the updated product
 */
const updateCompanyName = async (companyname: CompanyNameAttributes): Promise<any> => {
  return "feature coming soon...";
};

const deleteCompanyName = async (product: CompanyNameAttributes): Promise<any> => {
  return "feature coming soon...";
};

export { getCompanyName, getCompanyNameEntryByName, addCompanyName, updateCompanyName, deleteCompanyName };
