import express from "express";
import cookieParser from "cookie-parser";
import { getAllProds } from "../controllers/prodController.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

router.use(cookieParser());

// Route for showing all products in home page
router.get("/", auth, getAllProds);

export default router;