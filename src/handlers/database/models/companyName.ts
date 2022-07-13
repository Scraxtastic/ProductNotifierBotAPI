import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import { Model } from "sequelize";
import { INameValueMapping } from "../../../models/INameValueMapping";

export class CompanyNameCreationAttributes {
  companyName: string;
}

export class CompanyNameAttributes extends CompanyNameCreationAttributes {
  id: number;
  createdat: Date;
  updatedat: Date;
}

class CompanyNames extends Model<CompanyNameAttributes, CompanyNameCreationAttributes> {}

export default function (sequelize: Sequelize): typeof CompanyNames {
  const companyNames = CompanyNames.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      companyName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdat: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedat: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { sequelize, modelName: "CompanyNames", tableName: "companyname", createdAt: "createdat", updatedAt: "updatedat", schema: "ProductNotifier" }
  );
  return companyNames;
}
