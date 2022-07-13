import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import { Model } from "sequelize";
import { INameValueMapping } from "../../../models/INameValueMapping";

export class ProductTypeCreationAttributes {
  type: string;
}

export class ProductTypeAttributes extends ProductTypeCreationAttributes {
  id: string;
  createdat: Date;
  updatedat: Date;
}

class ProductTypes extends Model<ProductTypeAttributes, ProductTypeCreationAttributes> {}

export default function (sequelize: Sequelize): typeof ProductTypes {
  const productTypes = ProductTypes.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      type: {
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
      modelName: "ProductTypes",
      tableName: "producttype",
      createdAt: "createdat",
      updatedAt: "updatedat",
      schema: "ProductNotifier",
    }
  );
  return productTypes;
}
