import mysql from "mysql2";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.host,
    port: process.env.port,
    database: process.env.seqDatabase,
    password: process.env.password,
    username: process.env.user,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export {sequelize};