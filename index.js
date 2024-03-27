import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import session from "express-session";
import bcrpyt, { hash } from "bcrypt";
import multer from "multer";
import mysqlSequelize from "connect-session-sequelize";
import { sequelize } from "./config/database.js";
import { User } from "./db/user.js";
import { Product } from "./db/product.js";
import home from "./services/home.js";
import addProd from "./services/addProd.js";
import editProd from "./services/editProd.js";
import delProd from "./services/delProd.js";
import signUp from "./services/signUp.js";
import login from "./services/login.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

const SequelizeStore = mysqlSequelize(session.Store);

const sessionStore = new SequelizeStore({
    db: sequelize
});

sessionStore.sync();

//Middleware functions
app.use(session({
    secret: "It is a secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore
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

// app.get("/bcrypt", async (req, res) => {
//     const password = "password";
//     const hashedPass = await bcrpyt.hash(password, 10);
//     console.log(await bcrpyt.compare("hello", hashedPass));
//     res.send(hashedPass);
// });  

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

const main = async() => {
    try{
        await sequelize.authenticate();
        console.log("Database connected succefully!!");
        await User.sync();
        await Product.sync();
        console.log("Tables created");
    } catch(err) {
        console.log(err);
    }
}

main();

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on: http://localhost:${port}`);
    });
});
