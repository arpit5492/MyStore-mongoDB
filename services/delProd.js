import express from "express";
import { delProd } from "../controllers/prodController.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

router.get("/:id", auth, delProd);

export default router;