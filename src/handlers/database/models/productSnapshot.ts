import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import { Model } from "sequelize";

export class ProductSnapshotCreationAttributes {
  price: number;
  available: boolean;
  availability: string;
}

export class ProductSnapshotAttributes extends ProductSnapshotCreationAttributes {
  id: number;
  createdat: Date;
  updatedat: Date;
}

class ProductSnapshots extends Model<ProductSnapshotAttributes, ProductSnapshotCreationAttributes> {}

export default function (sequelize: Sequelize): typeof ProductSnapshots {
  const productSnapshot = ProductSnapshots.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      price: {
        type: DataTypes.INTEGER,
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
      createdat: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedat: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { sequelize, modelName: "ProductSnapshots", tableName: "productsnapshot", createdAt: "createdat", updatedAt: "updatedat", schema: "ProductNotifier" }
  );
  return productSnapshot;
}
