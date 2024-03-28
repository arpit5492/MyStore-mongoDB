import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import session from "express-session";
import bcrpyt, { hash } from "bcrypt";
import multer from "multer";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import { db } from "./config/database.js";
import home from "./services/home.js";
import addProd from "./services/addProd.js";
import editProd from "./services/editProd.js";
import delProd from "./services/delProd.js";
import signUp from "./services/signUp.js";
import login from "./services/login.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

const main = async() => {
    try{
        await mongoose.connect(db);
        console.log("Database connected!!");
    } catch(err) {
        console.log(err.message);
    }
}

main();

//Middleware functions
app.use(session({
    secret: "It is a secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongooseConnection: mongoose.connection,
        mongoUrl: db
    })
}));

const store = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./assets");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

app.use(multer( {storage: store} ).single("image"));

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("css"));
app.use(express.static("assets"));
app.use(morgan("dev"));
app.use("/", home);
app.use("/", addProd);
app.use("/editProd", editProd);
app.use("/delProd", delProd);
app.use("/", signUp);
app.use("/", login);



app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
});

