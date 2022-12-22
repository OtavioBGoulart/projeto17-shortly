import { Router } from "express";
import { URLValidate } from "../middlewares/urlvalidationMiddleware.js";
import { authorization } from "../middlewares/authMiddleware.js";
import { getUrlById, shortenUrl } from "../controllers/urlsControllers.js";

const router = Router();

router.post("/urls/shorten", authorization, URLValidate, shortenUrl);
router.get("/urls/:id", getUrlById);


export default router;