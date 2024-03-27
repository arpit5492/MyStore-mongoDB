import express from "express";
import { editProds, updateEachProd } from "../controllers/prodController.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

router.get("/:id", auth, editProds);

router.post("/:id", auth, updateEachProd);

export default router;