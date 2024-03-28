import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const db = 'mongodb+srv://'+process.env.username+':'+process.env.password+'@cluster0.ofeghsk.mongodb.net/'+process.env.database;

export {db};