import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import { Model } from "sequelize";
import { INameValueMapping } from "../../../models/INameValueMapping";

export class ProductNameCreationAttributes {
  productname: string;
}

export class ProductNameAttributes extends ProductNameCreationAttributes {
  id: string;
  createdat: Date;
  updatedat: Date;
}

class ProductNames extends Model<ProductNameAttributes, ProductNameCreationAttributes> {}

export default function (sequelize: Sequelize): typeof ProductNames {
  const productNames = ProductNames.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      productname: {
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
    {
      sequelize,
      modelName: "ProductNames",
      tableName: "productname",
      createdAt: "createdat",
      updatedAt: "updatedat",
      schema: "ProductNotifier",
    }
  );
  return productNames;
}
