import { Sequelize } from "sequelize";
import 'dotenv/config';

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
  dialect: "postgres"
});

import ProductCreator from "./models/Product";
export const Products = ProductCreator(sequelize);
import ApikeyCreator from "./models/Apikey";
export const Apikeys = ApikeyCreator(sequelize);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database-Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { testConnection };
