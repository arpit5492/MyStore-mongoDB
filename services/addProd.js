import express from "express";
import { renderAddProd, postAddProd } from "../controllers/prodController.js";
import bodyParser from "body-parser";
import { auth } from "../middlewares/auth.js";

const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));

router.get("/addProd", auth, renderAddProd);

router.post("/addProd", auth, postAddProd);

export default router;