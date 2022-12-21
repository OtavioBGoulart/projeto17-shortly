import { Router } from "express";
import { URLValidate } from "../middlewares/urlvalidationMiddleware.js";
import { authorization } from "../middlewares/authMiddleware.js";
import { shortenUrl } from "../controllers/usersController.js";

const router = Router();

router.post("/urls/shorten");


export default router;