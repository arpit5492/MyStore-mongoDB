import express from "express";
import { signUpRender, addUser } from "../controllers/userController.js";
const router = express.Router();

router.get("/sign-up", signUpRender);

router.post("/signUp", addUser);

export default router;