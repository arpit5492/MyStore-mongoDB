import { DataTypes} from "sequelize";
import { sequelize } from "../config/database.js";

const Product = sequelize.define("product", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    pName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.REAL,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {tableName: "products", timestamps: false});

export {Product};