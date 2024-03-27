import express from "express";
import { renderLogin, postLogin, logout } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

router.get("/login", renderLogin);

router.post("/login", postLogin);

router.get("/logout", auth, logout);

export default router;