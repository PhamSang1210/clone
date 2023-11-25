import express from "express";
const router = express.Router();
import AccessController from "../../controllers/AccessController.js";
// import { apiKey } from "../../Auth/CheckAuth.js";
import CheckAuth from "../../Auth/CheckAuth.js";

//Check Auth & Premission
router.use(CheckAuth.apiKey);
router.use(CheckAuth.premission("0000"));

router.post("/shop/register", AccessController.register);

export default router;
