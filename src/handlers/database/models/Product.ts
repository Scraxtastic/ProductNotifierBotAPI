import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import { Model } from "sequelize";
import { INameValueMapping } from "../../../models/INameValueMapping";

export class ProductCreationAttributes {
  title: string;
  description: string;
  price: number;
  link: string;
  thumbnail: string;
  image: string;
  websitename: string;
  available: boolean;
  availability: string;
  type: string;
  productname: string;
  additionalfields: INameValueMapping[];
}

export class ProductAttributes extends ProductCreationAttributes {
  id: number;
  createdat: Date;
  updatedat: Date;
}

class Products extends Model<ProductAttributes, ProductCreationAttributes> {}

export default function (sequelize: Sequelize): typeof Products {
  const products = Products.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      link: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      websitename: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      availability: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      productname: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      additionalfields: {
        type: DataTypes.JSON,
        allowNull: true,
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
    { sequelize, modelName: "Products", tableName: "product", createdAt: "createdat", updatedAt: "updatedat", schema: "ProductNotifier" }
  );
  return products;
}
