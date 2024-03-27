import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const User = sequelize.define("user", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "Username already exists"
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {tableName: "users", timestamps: false});

export {User};