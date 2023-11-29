import express from "express";
const router = express.Router();
import AccessController from "../../controllers/AccessController.js";
import CheckAuth from "../../Auth/CheckAuth.js";

//Check Auth & Premission
router.use(CheckAuth.apiKey);
router.use(CheckAuth.premission("0000"));

router.post(
    "/shop/register",
    CheckAuth.asyncHandler(AccessController.register)
);
router.post("/shop/login", CheckAuth.asyncHandler(AccessController.login));

//Authentication
router.post("/shop/logout", CheckAuth.asyncHandler(AccessController.logout));

export default router;
