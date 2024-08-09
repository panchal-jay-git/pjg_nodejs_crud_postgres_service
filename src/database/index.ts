import Logger from "../core/logger";
import { db } from "../config";
import { Sequelize } from "sequelize";
import EmployeeModel from "./model/employee";

export const sequelize: any = new Sequelize(db.name, db.user, db.password, {
  host: db.host,
  port: Number(db.port),
  username: db.user,
  password: db.password,
  database: db.name,
  dialect: "postgres",
  pool: {
    min: db.pool.min,
    max: db.pool.max,
  },
  logQueryParameters: process.env.NODE_ENV === "development",
  logging: (query, time) => {
    Logger.info(time + "ms" + " " + query);
  },
  benchmark: true,
  define: {
    timestamps: false,
  },
  dialectOptions: {
    // useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: true,
    timezone: "utc",
  },
  timezone: "utc",
  query: {
    raw: true,
  },
});

sequelize
  .authenticate()
  .then(async () => {
    await DB.Employee.sync();
    console.log("Connection has been established successfully.");
  })
  .catch((err: any) => {
    console.error("Unable to connect to the database:", err);
  });

const DB = {
  Employee: EmployeeModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
