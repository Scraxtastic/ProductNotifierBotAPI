import { DataTypes, Sequelize } from "sequelize";
import "dotenv/config";

// Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
// });

const sequelize = new Sequelize({
  database: process.env.DBName,
  username: process.env.DBUsername,
  password: process.env.DBPassword,
  host: process.env.DBHost,
  port: Number.parseInt(process.env.DBPort),
  dialect: "postgres",
});

import ApikeyCreator from "./models/apikey";
export const Apikeys = ApikeyCreator(sequelize);
import CompanyNameCreator from "./models/companyName";
export const CompanyNames = CompanyNameCreator(sequelize);
import ProductCreator from "./models/product";
export const Products = ProductCreator(sequelize);
import ProductNameCreator from "./models/productName";
export const ProductNames = ProductNameCreator(sequelize);
import ProductSnapshotCreator from "./models/productSnapshot";
export const ProductSnapshots = ProductSnapshotCreator(sequelize);
import ProductTypeCreator from "./models/productType";
export const ProductTypes = ProductTypeCreator(sequelize);

//Foreign Keys
ProductTypes.hasOne(ProductNames);
// ProductNames.belongsTo(ProductTypes);
Products.belongsTo(ProductNames);
// ProductNames.hasMany(Products, { foreignKey: "productNameID" });
Products.belongsTo(CompanyNames);
// CompanyNames.hasMany(Products, { foreignKey: "companyNameID" });
Products.belongsTo(ProductTypes);
// ProductTypes.hasMany(Products, { foreignKey: "productTypeID" });
Products.hasMany(ProductSnapshots);
// Products.hasMany(ProductSnapshots, { foreignKey: "productID" });

//TODO: Ask Besnik for help
const sync = async () => {
  let sync = await sequelize.sync({ force: true });
  console.log("Synced", sync);
};
sync();

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database-Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { testConnection };
