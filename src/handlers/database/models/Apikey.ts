import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import { Model } from "sequelize";
import { INameValueMapping } from "../../../models/INameValueMapping";

export class ApikeyCreationAttributes {
  givenTo: string;
  permissions: string;
}

export class ApikeyAttributes extends ApikeyCreationAttributes {
  id: number;
  createdat: Date;
  updatedat: Date;
}

class Apikeys extends Model<ApikeyAttributes, ApikeyCreationAttributes> {}

export default function (sequelize: Sequelize): typeof Apikeys {
  const apikeys = Apikeys.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      givenTo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      permissions: {
        type: DataTypes.JSON,
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
    { sequelize, modelName: "Apikeys", tableName: "apikey", createdAt: "createdat", updatedAt: "updatedat", schema: "ProductNotifier" }
  );
  return apikeys;
}
